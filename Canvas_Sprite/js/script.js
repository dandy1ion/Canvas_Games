let playerState = "idle";
const dropdown = document.getElementById("animations");
dropdown.addEventListener("change", function (e) {
	playerState = e.target.value;
});

const canvas = document.getElementById("canvas4");
const ctx = canvas.getContext("2d");

//GLOBAL VARIABLES
const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);

const playerImage = new Image(); //same as image tag in html
playerImage.src = "../Sprite_shadow_dog.png";
const spriteWidth = 575;
const spriteHeight = 523;
// let playerState = "idle";
// let frameX = 0;
// let frameY = 0;
let gameFrame = 0;
const staggerFrames = 15;
const spriteAnimations = [];
const animationStates = [
	{
		name: "idle",
		frames: 7,
	},
	{
		name: "jump",
		frames: 7,
	},
	{
		name: "fall",
		frames: 7,
	},
	{
		name: "run",
		frames: 9,
	},
	{
		name: "dizzy",
		frames: 11,
	},
	{
		name: "sit",
		frames: 5,
	},
	{
		name: "roll",
		frames: 7,
	},
	{
		name: "bite",
		frames: 7,
	},
	{
		name: "ko",
		frames: 12,
	},
	{
		name: "getHit",
		frames: 4,
	},
];
animationStates.forEach((state, index) => {
	let frames = {
		loc: [],
	};
	for (let j = 0; j < state.frames; j++) {
		let positionX = j * spriteWidth;
		let positionY = index * spriteHeight;
		frames.loc.push({ x: positionX, y: positionY });
	}
	spriteAnimations[state.name] = frames;
});
console.log(spriteAnimations);

function animate() {
	ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_WIDTH);
	let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length;
	let frameX = spriteWidth * position;
	let frameY = spriteAnimations[playerState].loc[position].y;

	ctx.drawImage(
		playerImage,
		frameX,
		frameY,
		spriteWidth,
		spriteHeight,
		0,
		0,
		spriteWidth,
		spriteHeight,
	);
	//cycling through animations

	gameFrame++;
	requestAnimationFrame(animate);
}
animate();

// window.addEventListener("resize", function () {
// 	canvas.width = window.innerWidth;
// 	canvas.height = window.innerHeight;
// 	size = canvas.width < canvas.height ? canvas.width * 0.1 : canvas.height * 0.1;
// });
