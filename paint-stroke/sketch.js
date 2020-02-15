//let counterTest = 0;

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

//initalize date
let date = new Date();
let hour = date.getHours();
let minute = date.getMinutes();
let previousHour;

//initalize paintstroke and color properties
let paint;
let colorGen;
let saturatedPercentChance = 50;
let warmerCounter = 0;
let coolerCounter = 0;
let brighterCounter = 0;
let darkerCounter = 0;

//initalize timer
let currentSeconds;
let previousSeconds;
let interval = 4;
let timer = 0;

//initalize evolution
let alphabets = "+-Aa><SMwcbd".split("");
let command = ""; //input commands here

let population = []; //store a record of the previous iterations of the paintstroke
let population_size = 10;

//target to change over time, whatever this is will be what the evolution system will strive for.
let target = "+++ddddaMMMcc>>>";

//GENERATE A PHENOTYPE FROM THE SERIES OF COMMANDS FROM alphabets

let genotypeLength = 15;
let mutation_rate = 0.05;

function setup() {
  // put setup code here

  createCanvas(window.innerWidth, window.innerHeight);
  background(220);

  //initalize evolution
  changeTarget();

  //initalize population here
  //make it an array with 15 factors for evolution (15 genotypes)
  for (let i = 0; i < population_size; i++){
	  let geno = [];
	  //let stringGenotype = "";

  	  for (let i = 0; i < genotypeLength; i++) {
	    geno.push(Math.floor((Math.random(alphabets.length + 1) * 10))); //takes a random character from alphabets 0 - alphabets.length
      }

      population[i] = {
        genotype: geno //key: genotype, value: the index of object genotype[i]
      };
  }

  console.log(develop(population[0].genotype));

  //initalize paintstroke and its color
  paint = new PaintStroke();
  colorGen = new ColorGenerator();

  interpret(command, paint, colorGen);

  saturatedColorChance(colorGen, saturatedPercentChance);
  modifyColor();
  paint.setColor(colorGen.getRed(), colorGen.getGreen(), colorGen.getBlue());
}

function draw() {

  // currentHour = date.getHours();
  // if (currentHour > previousHour){
  // 	changeTarget(); //doesn't necessarily change targets, it just assesss the current target
  // }
  // previousHour = currentHour;


  //TIMER STUFF
  currentSeconds = second();

  if (currentSeconds > previousSeconds) {

  	//EVOLVES every 25 seconds (2 times per minute) (i.e. when minute's modulo is zero) 
  	if (currentSeconds % 25 == 0)  {
  		evolve();
  		
  		changeTarget();
  	}

  	console.log(second());
  	timer++;
  }

  

  previousSeconds = currentSeconds;

  //DO PAINTBRUSH THINGS ON TIMED INTERVAL
  if (timer >= interval){
  	saturatedColorChance(colorGen, saturatedPercentChance);  	

  	modifyColor();

  	paint.setColor(colorGen.getRed(), colorGen.getGreen(), colorGen.getBlue());
  	randomizeLocation(paint); //renew paint location //location is not influenced by evolution


  	timer = 0;
  }


  // put drawing code here
  paint.setY(paint.getY() + 1);
  paint.display();
}


const randomizeLocation = (paintStrokeObject) => {
	paintStrokeObject.setX(random(windowWidth));
	paintStrokeObject.setY(random(windowHeight));
};

/*
	This is the interpreter of the commands

	input: string of commands
*/
const interpret = (commands, paintStrokeObject, colorGeneratorObject) => {
  for (let i = 0; i < commands.length; i++) {
    let cmd = commands[i];
    
    if (cmd == '+'){ // size of paint brush increases
    	paintStrokeObject.setSize(paintStrokeObject.getSize() *  1.3); // increase 30%
    } else if (cmd =='-'){ // size of paint brush decreases
    	paintStrokeObject.setSize(paintStrokeObject.getSize() * 0.7); // decrese 30%
    } else if (cmd =='A'){ // increases the paint stroke's alpha values
    	if(paintStrokeObject.getAlpha() * 1.5 > 0.1){ // it can never exceed 0.1 alpha
    		paintStrokeObject.setAlpha(0.1);	
    	} else{
    		paintStrokeObject.setAlpha(paintStrokeObject.getAlpha() * 1.5);	
    	}
    } else if (cmd =='a'){ // decreases the paint stroke's alpha values
    	if(paintStrokeObject.getAlpha() * 0.5 < 0.005){ // it can never fall below 0.005 alpha
    		paintStrokeObject.setAlpha(0.005);	
    	} else{
    		paintStrokeObject.setAlpha(paintStrokeObject.getAlpha() * 0.5);	
    	}
    } else if (cmd =='>'){
			interval++; // increase paint interval by 1
      // ensures that the interval never goes higher than 10
      if(interval > 10){
        interval = 10;
      }
    } else if (cmd =='<'){
			interval--; // subtract paint interval by 1
      // ensures that interval never goes below 1 seconds
      if(interval < 1){
        interval = 1;
      }
    } else if (cmd =='w'){
    	warmerCounter += 1;
    	// colorGeneratorObject.redder(); //increase red value by 10% to make it warmer
    } else if (cmd =='c'){
    	coolerCounter += 1;
    	// colorGeneratorObject.bluer(); //increase blue value by 10% to make it cooler
    } else if (cmd =='b'){
    	brighterCounter += 1;
    	// colorGeneratorObject.brighter(); //increase all coloer values by 10%, makes it brighter
    } else if (cmd =='d'){
    	darkerCounter += 1;
    	// colorGeneratorObject.darker(); //decrease all coloer values by 10%, makes it darker
    } else if (cmd =='S'){
    	// makes saturated colors occur more, muted colors appear less in turn
    	saturatedPercentChance += 10; //add 5%
    } else if (cmd =='M'){
    	saturatedPercentChance -= 10; //subtract 5% chance
    	// makes muted colors occur more, saturated colors appear less in turn
    }

  }
};

//alters the values in this class to facilitate phenotype expression of the new generation
const evolve = () => {
	//counterTest++;
  	
  	generation(); 
  	
  	//reinitalize properties by creating a new paintstroke and colorgenerator every evolution to reset properties
  	paint = new PaintStroke(); 
  	let previousColors = [colorGen.getRed(), colorGen.getGreen(), colorGen.getBlue()];
  	colorGen = new ColorGenerator();
  	colorGen.set(previousColors[0], previousColors[1], previousColors[2]);
  	paint.setColor(colorGen.getRed(), colorGen.getGreen(), colorGen.getBlue());
  	  
  	//reset interval, percent chance, and counters to neutral
  	interval = 4;
  	saturatedPercentChance = 50; 
  	warmerCounter = 0;
  	coolerCounter = 0;
  	darkerCounter = 0;
  	brighterCounter = 0;

  	command = develop(population[0].genotype);
  	console.log("Evolved! Current:", command, "Target", target);
  	interpret(command, paint, colorGen); //interpret the newly created command	
};

/*
	changes the target (ideal) phenotype on 3 AM, 6 AM, 9 AM, 12 PM, 3 PM, 6 PM, 9 PM, and 12 AM
*/
const changeTarget = () => {
	let d = new Date();

	if (d.getHours() >= 0 && d.getHours() < 3){ //if it's between 12 am and 3 am
		target = "dddd+++aaMMMcMM";
	} else if (d.getHours() >= 3 && d.getHours() < 6){ //between 3 am and 6 am
		target = "S+a+<bbAacaaAA<";
	} else if (d.getHours() >= 6 && d.getHours() < 9){ //between 6 am and 9 am
		target = "<<wbbbA-ww-SS+A";
	} else if (d.getHours() >= 9 && d.getHours() < 12){ //between 9 am and 12 pm
		target = "wwbbbAA<<<SSSSS";
	} else if (d.getHours() >= 12 && d.getHours() < 15){ //between 12 pm and 3 pm
		target = "ba<SM+-A<>wdb><";
	} else if (d.getHours() >= 15 && d.getHours() < 18){ //between 3 pm and 6 pm
		target = "+aMM>d+-+<-+MS<";
	} else if (d.getHours() >= 18 && d.getHours() < 21){ //between 6 pm and 9 pm
		target = "ccddd+>+aMMM>d";
	} else if (d.getHours() >= 21){ //between 9 pm and 12 am
		target = "+++dddaMMMcc>>>";
	} 

	console.log("Target is currently", target);
};

//changes the colors based on the counter size
const modifyColor = () => {
	for (let i = 0; i < warmerCounter; i++) {
  		colorGen.redder();
  	}

  	for (let i = 0; i < coolerCounter; i++) {
  		colorGen.bluer();
  	}


  	for (let i = 0; i < brighterCounter; i++) {
  		colorGen.brighter();
  	}

	for (let i = 0; i < darkerCounter; i++) {
  		colorGen.darker();
  	}
};

//pre: input must be [1, 100]
//
const saturatedColorChance = (colorGeneratorObject, percentChance) => {

	//ensures input stays between [1, 100]
	if(percentChance < 0){
		percentChance = 0;
	}

	if(percentChance > 100){
		percentChance = 100;
	}	


	let result = Math.floor(Math.random() * 100); //from 0 to 100(?)
	//console.log(result);
	//output resuly > percentChance ? "what you don't want" : "the output you want"
	console.log((result > percentChance ? "muted color" : "saturated color"));
	result > percentChance ? colorGeneratorObject.generateMutedColor() : colorGeneratorObject.generateSaturatedColor(); //if result is >= 50, return 1 otherwise return 2
};



//FUNCTIONS RELATED TO EVOLUTION
const develop = (genotype) => {
	let listOfTraits = "";

	//converts the genes (represented as numbers) of the genotype into a symbol in the list of traits
	genotype.forEach((gene) => {
		listOfTraits = listOfTraits.concat(alphabets[gene]);
	});

	return listOfTraits;
};

// an algorithm to return the longest common substring of two strings
// transcribed from https://en.wikipedia.org/wiki/Longest_common_substring_problem
function longest_common_substring(s, t) {
  let L = new Array(s.length);
  let z = 0; // length of the longest common fragment so far
  let ret = "";
  for (var i = 0; i < s.length; i++) {
    L[i] = new Array(t.length);
    for (var j = 0; j < t.length; j++) {
      if (s[i] == t[j]) {
        let v = 1;
        if (i > 0 && j > 0) {
          v = L[i - 1][j - 1] + 1;
        }
        L[i][j] = v;
        // is this the longest we found yet?
        if (v > z) {
          ret = s.substring(i - v + 1, i + 1);
          z = v;
        }
      } else {
        L[i][j] = 0;
      }
    }
  }
  return ret;
}

//used to compare the sentence constructed by develop() with the target sentence
//returns a number value: 1 if phenotype matches the target
//                        a decimal value if the target is off target, closer to 1 = more it resembles the target
const evaluate = (phenotype) => {
  let lcs = longest_common_substring(phenotype, target);  
  return lcs.length / target.length;
};

//putting all the above functions together!
function generation() {
  
  // develop, evaluate and sort population:
  for (let a of population) {
    a.phenotype = develop(a.genotype)
  }

  for (let a of population) {
    a.fitness = evaluate(a.phenotype) //create a new object property called 'fitness' in every object in population 
  }

  //sort fitness, where population[0] is the most fit
  population = population.sort(function(a, b) {
    return b.fitness - a.fitness;
  });

  // reproduce:
  let new_population = [];
  for (let i=0; i<population_size; i++) {
    let genotype = [];
    // pick a parent to inherit from
    let parent = population[Math.floor(Math.random(i))]; //assumes that all paint strokes have equal chance of living

    //console.log(`Parent: ${parent.fitness}`);
    // for each gene in the genotype
    for (let i = 0; i < genotypeLength; i++) {
      if (Math.random() < mutation_rate) {
        // get a random gene
        genotype.push(Math.floor((Math.random(alphabets.length + 1) * 10)));
      } else {
        // inherit a gene
        genotype.push(parent.genotype[i]);
      }
    }
       
    if (Math.random() < mutation_rate) {
      // shuffle the genes around:
      let num_to_shuffle = random(4) + 1;
      let shuffle_point = random(genotype.length - num_to_shuffle + 1);
      let shuffled = genotype.splice(shuffle_point, num_to_shuffle);
      if (random() < 0.5) {
        genotype = genotype.concat(shuffled);
      } else {
        genotype = shuffled.concat(genotype);
      }
    }
    
    // add to new population
    new_population[i] = {
      genotype: genotype
    };
  }

  //console.log(population[0].phenotype, population[0].fitness);
  console.log("Fitness:", population[0].fitness);
    
  population = new_population; //changes the population with the new population
}