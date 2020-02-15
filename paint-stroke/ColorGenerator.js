/*
	This class creates an object that produces a randomly generated color which can have its values tweaked slightly
	by its available helper methods
*/


class ColorGenerator{
	constructor(){
		
		this.color = {
			red: 0,
			green: 0,
			blue: 0,
		};
	}

	set(r, g, b){
		this.color.red = r;
		this.color.green = g;
		this.color.blue = b;
	}

	setRed(newRed){
		this.color.red = newRed;
	}

	setGreen(newGreen){
		this.color.green = newGreen;
	}

	setBlue(newBlue){
		this.color.blue = newBlue;
	}



	/*increases the selected color value by "multiplier" value
	
	  post-condition: color will never exceed 255
	  String color = either "red" "blue" or "green"
	  int multiplier = the color value will be multiplied by a multiplier
		
	  sample input: increaseColorValue("red", 1.5) increases the value by 50%
	  				increaseColorValue("red", 0.5) reduces the value by 50%
	*/ 
	multiplyColorValue(color, multiplier){

		if(color == "red"){

			//if greater than 255
			if((this.getRed() * multiplier) <= 255){
				this.setRed(this.getRed() * multiplier); 
			} else if ((this.getRed() * multiplier) >= 255){
				this.setRed(255);
			}

		} else if(color == "green"){

			//if greater than 255
			if((this.getGreen() * multiplier) <= 255){
				this.setGreen(this.getGreen() * multiplier); 
			} else if ((this.getGreen() * multiplier) >= 255){
				this.setGreen(255);
			}

		} else if (color == "blue"){

			//if greater than 255
			if((this.getBlue() * multiplier) <= 255){
				this.setBlue(this.getBlue() * multiplier); 
			} else if ((this.getBlue() * multiplier) >= 255){
				this.setBlue(255);
			}
		}else if(!(color == "red" || color == "green" || color == "blue")){
			console.log("input must be either \"red\", \"green\", or \"blue\"");
		}
	}

	/*increases the selected color value by "addValue" value
	
	  post-condition: color will never exceed 255 or go less than 0
	  String color = either "red" "blue" or "green"
	  int addValue = the color value will be added by tha addValue
		
	  sample input: increaseColorValue("red", 5) increases the value by 5
	  				increaseColorValue("red", -5) reduces the value by 5
	*/ 
	addColorValue(color, addValue){

		if(color == "red"){

			//if greater than beteen 0 and 255
			if(((this.getRed() + addValue) <= 255) && ((this.getRed() + addValue) >= 0)){
				this.setRed(this.getRed() + addValue); 
			} else if ((this.getRed() + addValue) > 255){ //if it will be greater than 255
				this.setRed(255);
			} else if ((this.getRed() + addValue) < 0){ //if it will be less than 0
				this.setRed(0);
			}

		} else if(color == "green"){

			//if greater than beteen 0 and 255
			if(((this.getGreen() + addValue) <= 255) && ((this.getGreen() + addValue) >= 0)){
				this.setGreen(this.getGreen() + addValue); 
			} else if ((this.getGreen() + addValue) > 255){ //if it will be greater than 255
				this.setGreen(255);
			} else if ((this.getGreen() + addValue) < 0){ //if it will be less than 0
				this.setGreen(0);
			}

		} else if (color == "blue"){
			
			//if greater than beteen 0 and 255
			if(((this.getBlue() + addValue) <= 255) && ((this.getBlue() + addValue) >= 0)){
				this.setBlue(this.getBlue() + addValue); 
			} else if ((this.getBlue() + addValue) > 255){ //if it will be greater than 255
				this.setBlue(255);
			} else if ((this.getBlue() + addValue) < 0){ //if it will be less than 0
				this.setBlue(0);
			}

		}else if(!(color == "red" || color == "green" || color == "blue")){
			console.log("input must be either \"red\", \"green\", or \"blue\"");
		}
	}


	getColor(){
		return this.color;
	}

	getRed(){
		return this.color.red;
	}

	getGreen(){
		return this.color.green;
	}

	getBlue(){
		return this.color.blue;
	}

	generateRandomColor(){
		this.set(random(255), random(255), random(255));
	}

	/*
		generate a saturated color by
		running it through an hsl to rgb converter, setting it to high saturation and medium lumoisty
		it then returns an rgb value that you can use to output in rgb format
	*/
	generateSaturatedColor(){
		let hue = Math.floor(random(360));
		let colorValue = this.hslToRgb(hue, 1.0, 0.5);
		console.log(colorValue);
		this.set(colorValue[0], colorValue[1], colorValue[2]);
	}

	/*
		generate a muted color by
		running it through an hsl to rgb converter
		some limits to saturation and lumosity so that it prevents it from going full black/full white
		it then returns an rgb value that you can use to output in rgb format
	*/
	generateMutedColor(){
		let hue = Math.floor(random(360));
		let saturation = 0.15 + (random() * 0.85);//between 15 to 100
		let lumosity = 0.3 + (random() * 0.5); //between 0.3 to 0.8

		let colorValue = this.hslToRgb(hue, saturation, lumosity);

		console.log(colorValue);
		this.set(colorValue[0], colorValue[1], colorValue[2]);
	}

	//increases the all color values by 5 points, but no color will exceed 255
	brighter(){
		this.addColorValue("red", 30);
		this.addColorValue("green", 30);
		this.addColorValue("blue", 30);
	}

	//darkens all color values by 5 points
	darker(){
		this.addColorValue("red", -30);
		this.addColorValue("green", -30);
		this.addColorValue("blue", -30);
	}

	//this can be used to saturate a color
	//the redder something is, the warmer it is
	//increases red value by 10%
	redder(){
		this.multiplyColorValue("red", 1.2);
	}

	//this can be used to saturate a color
	greener(){
		this.multiplyColorValue("green", 1.2);
	}

	//this can be used to saturate a color
	//the bluer something is, the cooler it is
	//increases blue value by 10%
	bluer(){
		this.multiplyColorValue("blue", 1.2);
	}


	// expected hue range: [0, 360)
	// expected saturation range: [0, 1]
	// expected lightness range: [0, 1]
	// based on algorithm from http://en.wikipedia.org/wiki/HSL_and_HSV#Converting_to_RGB
  	hslToRgb(hue, saturation, lightness){
  		if( hue == undefined ){
    		return [0, 0, 0];
  		}

  		var chroma = (1 - Math.abs((2 * lightness) - 1)) * saturation;
  		var huePrime = hue / 60;
  		var secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1));

  		huePrime = Math.floor(huePrime);
  		var red;
  		var green;
  		var blue;

  		if( huePrime === 0 ){
    		red = chroma;
    		green = secondComponent;
    		blue = 0;
  		}else if( huePrime === 1 ){
    		red = secondComponent;
    		green = chroma;
    		blue = 0;
  		}else if( huePrime === 2 ){
    		red = 0;
    		green = chroma;
    		blue = secondComponent;
  		}else if( huePrime === 3 ){
    		red = 0;
    		green = secondComponent;
    		blue = chroma;
  		}else if( huePrime === 4 ){
    		red = secondComponent;
    		green = 0;
    		blue = chroma;    
  		}else if( huePrime === 5 ){
    		red = chroma;
    		green = 0;
    		blue = secondComponent;
  		}

  		var lightnessAdjustment = lightness - (chroma / 2);
  		red += lightnessAdjustment;
  		green += lightnessAdjustment;
  		blue += lightnessAdjustment;

  		return [Math.round(red * 255), Math.round(green * 255), Math.round(blue * 255)];
	}

}