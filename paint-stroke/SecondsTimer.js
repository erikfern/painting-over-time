//THIS ISN'T FINISHED

class SecondsTimer{
	
	constructor(){
		this.currentSeconds;
		this.previousSeconds;
		this.timer;
	}

	//"something" MUST be a function
	doSomethingOnInterval(something, interval){
		this.currentSeconds = second();

		if (this.currentSeconds > this.previousSeconds) {
  			console.log(second());
  			this.timer++;
  		}

  		if (this.timer >= interval){
  			something();

  			this.timer = 0;
  		}

  		this.previousSeconds = this.currentSeconds;
	}
}