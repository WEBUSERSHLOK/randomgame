const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let car = { x: 175, y: 500, width: 50, height: 80, speed: 5 };
let obstacles = [];
let gameSpeed = 3;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let keys = {};
let gameOver = false;

document.getElementById("highScore").textContent = highScore;
document.addEventListener("keydown", (e) => keys[e.key] = true);
document.addEventListener("keyup", (e) => keys[e.key] = false);
document.addEventListener("keydown", (e) => {
    if (e.key === " " && gameOver) restartGame();
});

function drawCar() {
    ctx.fillStyle = "red";
    ctx.fillRect(car.x, car.y, car.width, car.height);
}

function createObstacle() {
    let x = Math.random() * (canvas.width - 50);
    obstacles.push({ x, y: -50, width: 50, height: 50 });
}

function moveObstacles() {
    for (let obs of obstacles) {
        obs.y += gameSpeed;
    }
    obstacles = obstacles.filter(obs => obs.y < canvas.height);
}

function checkCollision() {
    for (let obs of obstacles) {
        if (car.x < obs.x + obs.width &&
            car.x + car.width > obs.x &&
            car.y < obs.y + obs.height &&
            car.y + car.height > obs.y) {
            endGame();
        }
    }
}

function update() {
    if (gameOver) return;
    if (keys["ArrowLeft"] && car.x > 0) car.x -= car.speed;
    if (keys["ArrowRight"] && car.x < canvas.width - car.width) car.x += car.speed;

    if (Math.random() < 0.02) createObstacle();
    moveObstacles();
    checkCollision();

    gameSpeed += 0.002;
    score++;
    document.getElementById("score").textContent = score;
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawCar();
    ctx.fillStyle = "blue";
    for (let obs of obstacles) {
        ctx.fillRect(obs.x, obs.y, obs.width, obs.height);
    }
}

function gameLoop() {
    update();
    draw();
    if (!gameOver) requestAnimationFrame(gameLoop);
}

function endGame() {
    gameOver = true;
    document.getElementById("gameOverMessage").style.display = "block";
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        document.getElementById("highScore").textContent = highScore;
    }
}

function restartGame() {
    gameOver = false;
    score = 0;
    gameSpeed = 3;
    obstacles = [];
    car.x = 175;
    document.getElementById("score").textContent = score;
    document.getElementById("gameOverMessage").style.display = "none";
    gameLoop();
}

gameLoop();
