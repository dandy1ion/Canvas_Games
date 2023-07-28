/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("canvas6");
const ctx = canvas.getContext("2d");
CANVAS_WIDTH = canvas.width = 500;
CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 100;
const enemiesArray = [];

// const enemyImage = new Image();
// enemyImage.src = "../images/enemy1.png";

let gameFrame = 0;

// enemy1 = {
// 	x: 10,
// 	y: 50,
// 	width: 200,
// 	height: 200,
// };

//JS CLASS
class Enemy {
	constructor() {
		this.image = new Image();
		this.image.src = "../images/enemy3.png";
		// this.width = 100;
		// this.height = 100;
		this.speed = Math.random() * 4 + 1; //between 1 & 5
		this.spriteWidth = 218;
		this.spriteHeight = 177;
		//correct sizing ratio
		this.width = this.spriteWidth / 2.5;
		this.height = this.spriteHeight / 2.5;
		this.x = Math.random() * (canvas.width - this.width); //between 0 & canvas width
		this.y = Math.random() * (canvas.height - this.height); //between 0 & canvas height
		//animate sprites
		this.frame = 0;
		this.flapSpeed = Math.floor(Math.random() * 3 + 1); //between 1 & 4
		// this.angle = Math.random() * 2;
		this.angle = 0; //could also use Math.random()...
		this.angleSpeed = Math.random() * 0.5 + 0.5; //adjust speed
		this.curve = Math.random() * 200 + 50; //between 50 & 150
	}
	update() {
		// this.x =
		// 	this.curve * Math.sin((this.angle * Math.PI) / 90) + (canvas.width / 2 - this.width / 2); //horizontal movement (180, 360, 90, 90, 90, 90, 180)
		// //can switch sin and cos, can use both with sin or both with cos
		// this.y =
		// 	this.curve * Math.cos((this.angle * Math.PI) / 500) + (canvas.height / 2 - this.height / 2); //vertical movement (180, 180, 500, 360, 180, 90, 90)
		//movement path more obvious:
		this.x =
			(canvas.width / 2) * Math.sin((this.angle * Math.PI) / 90) +
			(canvas.width / 2 - this.width / 2);
		this.y =
			(canvas.height / 2) * Math.cos((this.angle * Math.PI) / 500) +
			(canvas.height / 2 - this.height / 2);
		this.angle += this.angleSpeed;
		if (this.x + this.width < 0) this.x = canvas.width;
		//animate sprites
		if (gameFrame % this.flapSpeed === 0) {
			this.frame > 4 ? (this.frame = 0) : this.frame++;
		}
	}
	draw() {
		// ctx.fillRect(this.x, this.y, this.width, this.height);
		// ctx.strokeRect(this.x, this.y, this.width, this.height);
		ctx.drawImage(
			this.image,
			this.frame * this.spriteWidth,
			0,
			this.spriteWidth,
			this.spriteHeight,
			this.x,
			this.y,
			this.width,
			this.height,
		);
	}
}

// const enemy1 = new Enemy();
// const enemy2 = new Enemy();
for (let i = 0; i < numberOfEnemies; i++) {
	enemiesArray.push(new Enemy());
}

// console.log(enemiesArray);

function animate() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	// enemy1.x++;
	// enemy1.y++;
	// enemy2.x += 0.5;
	// enemy2.y += 0.5;

	// enemy1.update();
	// enemy1.draw();

	enemiesArray.forEach((enemy) => {
		enemy.update();
		enemy.draw();
	});
	gameFrame++;

	// ctx.fillRect(enemy1.x, enemy1.y, enemy1.width, enemy1.height);
	// ctx.fillRect(enemy2.x, enemy2.y, enemy2.width, enemy2.height);
	requestAnimationFrame(animate);
}
animate();
