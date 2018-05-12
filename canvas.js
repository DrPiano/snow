let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

/*Need this event listener to track where the mouse is on the canvas*/
window.addEventListener('mousemove', 
	function(event){  //event is an object with tons of properties to it, which happen to have x and y.
		mouse.x = event.x;
		mouse.y = event.y;

});
//Event listener for responsively resizing your canvas on the fly 
window.addEventListener('resize', function(){
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();  //initialize the screen
});

//variable to hold the mouses position.
let mouse = {
	x: undefined,
	y: undefined
}
let circleArray = [];

let maxRadius = 40;

let colorArray = [   //salt water taffy colors
	'#FFFFFF',
	'#BFFFFF',
	'#DBFFFF',
	'#E0EDE3',
	'#C8DAFF'

	];


/* Circle Object Constructor*/
function Circle(x, y, dx, dy, radius) {
	this.x = x; 
	this.y = y;
	this.dx = dx;
	this.dy = dy;
	this.radius = radius;
	this.minRadius = radius;
	this.color = colorArray[Math.floor(Math.random() * colorArray.length)]; 

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius,0,Math.PI * 2,false);
		c.fillStyle = this.color;  
		c.fill();
	}

	this.update = function(){
		// if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
		// 	this.dx = -this.dx;
		// }
		
		// if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
		// 	this.dy = -this.dy;
		// }
		
		// this.x += this.dx;
		this.y += this.dy;

		if(this.y + this.radius > innerHeight){
			this.y = 0;
		}

		//Interactivity code begins here
		if (mouse.x - this.x < 50 && mouse.x - this.x > -50 &&
			mouse.y - this.y < 50 && mouse.y - this.y > -50 ) { /*This conditional creates the invisible bounds that the mouse penetrates*/
			
			/* Nested if.... wont let circle grow passed max*/
			if(this.radius < maxRadius) {
				this.radius += 1;               
			}
			/* outer if Else... circles that arent in range will shrink but not passed minimum radius */
		} else if(this.radius  > this.minRadius ) {
			this.radius -= 1;
		}
		this.draw();

	}

}/*Circle Object end*/


/*initializes the circleArray by pushing in Circle Objects with a for loop*/
function init(){
	
	circleArray = [];

	for (var i = 0; i < window.innerWidth; i++) {
		let radius = Math.random() * 3 + 1; //Random number 0 through 3 but adding 1 so range is 1 - 4
		// let x = Math.random() * (innerWidth - radius * 2) + radius; 
		let x = i; 
		let y = Math.random() * (innerHeight - radius *2) + radius;
		// let dx = (Math.random() - 0.5) * 6;
		let dx = 0;
		// let dy = (Math.random() -0.5 ) * 6;
		let dy = Math.random() * 6;

		
		circleArray.push(new Circle(x, y, dx, dy, radius));
		x = i + 2;
	}
	
}

function animate() {
	requestAnimationFrame(animate);

	c.clearRect(0,0, innerWidth, innerHeight);

	for (var i = 0; i < circleArray.length; i++) {

		circleArray[i].update();
	}

}



//main 
init();
animate();

