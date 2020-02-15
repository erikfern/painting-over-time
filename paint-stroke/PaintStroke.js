class PaintStroke {
	
	//constructor + fields
	constructor(){
		this.x = random(window.width);
		this.y = random(window.height);
		this.size = 50;

		this.r = 200;
		this.g = 200;
		this.b = 200;
		this.a = 0.02; //slightly transparent by default
	}

	//methods

	//changes the size of the paintstroke by setting it as the new width and height
	setSize(newSize){
		this.size = newSize;
	}

	getSize(){
		return this.size;
	}

	//changes the color by individually altering r, g, and b values
	setColor(r, g, b){
		this.r = r;
		this.g = g;
		this.b = b;
	}

	//get the x and y coordinates
	getX(){
		return this.x;
	}

	getY(){
		return this.y;
	}

	//set the x and y coordinates
	setX(newX){
		this.x = newX;
	}

	setY(newY){
		this.y = newY;
	}

	//gets the alpha channel values
	getAlpha(){
		return this.a;
	}

	//changes the alpha value of the paint stroke
	setAlpha(newAlpha){
		this.a = newAlpha;
	}

	//wraps the paintstroke location. sends it to the opposite end if it leaves the screen
	//screen size is based on the current screen 
	wrap(){
		if (this.getY() > window.innerHeight){
			this.setY(0);
		}

		if (this.getY() < 0){
			this.setY(window.innerHeight);
		}

		if (this.getX() > window.innerWidth){
			this.setX(0);
		}

		if (this.getX() < 0){
			this.setX(window.innerHeight);
		}
	}



	display(){
		noStroke();
		fill(`rgba(${Math.floor(this.r)}, ${Math.floor(this.g)}, ${Math.floor(this.b)}, ${this.a})`);
		ellipseMode(CENTER);
		ellipse(this.x, this.y, this.size, this.size);

		this.wrap();
	}
}