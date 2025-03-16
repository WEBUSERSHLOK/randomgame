const canvas = document.getElementById("cricketCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

let score = 0;
let balls = 0;
let wickets = 0;
let overs = 0;
let currentPlayer = 1;
let isBatting = false;
let isGameOver = false;
let maxOvers = 5;
let bowlerX = 100; // Bowler's starting X position
let bowlerY = 300; // Bowler's starting Y position

// Elements
const startBtn = document.getElementById("startBtn");
const batBtn = document.getElementById("batBtn");
const bowlBtn = document.getElementById("bowlBtn");
const hitBtn = document.getElementById("hitBtn");
const gameStatus = document.getElementById("gameStatus");
const scoreDisplay = document.getElementById("score");
const ballsDisplay = document.getElementById("balls");
const wicketsDisplay = document.getElementById("wickets");
const oversDisplay = document.getElementById("overs");

// Start Game
startBtn.addEventListener("click", () => {
    maxOvers = 5; // Reset max overs
    score = 0;
    balls = 0;
    wickets = 0;
    isGameOver = false;
    gameStatus.textContent = "Select your role!";
    startBtn.disabled = true;
    batBtn.classList.remove("hidden");
    bowlBtn.classList.remove("hidden");
});

// Batting Mode
batBtn.addEventListener("click", () => {
    isBatting = true;
    gameStatus.textContent = `You are batting!`;
    batBtn.classList.add("hidden");
    bowlBtn.classList.add("hidden");
    hitBtn.classList.remove("hidden");
});

// Bowling Mode
bowlBtn.addEventListener("click", () => {
    isBatting = false;
    gameStatus.textContent = `You are bowling!`;
    batBtn.classList.add("hidden");
    bowlBtn.classList.add("hidden");
    // Simulate bowling run-up and delivery
    setTimeout(() => {
        bowlBall();
    }, 1000);
});

// Batting Logic
hitBtn.addEventListener("click", () => {
    if (balls < maxOvers * 6 && wickets < 3) {
        const runs = Math.floor(Math.random() * 7); // Runs between 0-6
        score += runs;
        balls++;
        updateGameInfo();
        gameStatus.textContent = `Player ${currentPlayer} hit ${runs} runs!`;

        if (runs === 0) {
            wickets++;
            gameStatus.textContent = `Player ${currentPlayer} is out!`;
            currentPlayer++;
            if (currentPlayer > 2) {
                currentPlayer = 1;
            }
        }
    } else {
        endGame();
    }
});

// Bowling Simulation
function bowlBall() {
    if (balls < maxOvers * 6 && wickets < 3) {
        // Animation for Bowler's Run-Up
        bowlerRunUp();
    }
}

// Bowler's Run-Up Animation
function bowlerRunUp() {
    let runUpInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawField();
        drawBowler(bowlerX, bowlerY);

        if (bowlerX > canvas.width / 2) {
            clearInterval(runUpInterval);
            bowlDelivery();
        } else {
            bowlerX += 2;
        }
    }, 50);
}

// Bowl Delivery
function bowlDelivery() {
    let ballX = bowlerX;
    let ballY = bowlerY - 10;

    // Simulate Ball Movement
    let deliveryInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawField();
        drawBowler(bowlerX, bowlerY);

        ballX += 5;
        if (ballX > canvas.width) {
            clearInterval(deliveryInterval);
            checkBatterShot();
        }
        drawBall(ballX, ballY);
    }, 50);
}

// Draw Bowler
function drawBowler(x, y) {
    ctx.fillStyle = "blue";
    ctx.fillRect(x, y, 20, 40); // Bowler (rectangular)
}

// Draw Ball
function drawBall(x, y) {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, Math.PI * 2);
    ctx.fill();
}

// Draw Field
function drawField() {
    ctx.fillStyle = "green";
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Field
}

// Check Batter's Shot (Random outcome)
function checkBatterShot() {
    const runs = Math.floor(Math.random() * 7); // Runs 0-6
    if (runs === 0) {
        wickets++;
        gameStatus.textContent = `Batter is out!`;
    } else {
        score += runs;
        gameStatus.textContent = `Batter scored ${runs} runs!`;
    }

    balls++;
    updateGameInfo();
    if (balls >= maxOvers * 6 || wickets >= 3) {
        endGame();
    }
}

// Update Game Info
function updateGameInfo() {
    scoreDisplay.textContent = score;
    ballsDisplay.textContent = balls;
    wicketsDisplay.textContent = wickets;
    oversDisplay.textContent = Math.floor(balls / 6);
}

// End Game
function endGame() {
    isGameOver = true;
    gameStatus.textContent = `Game Over! Final Score: ${score}, Wickets: ${wickets}`;
    startBtn.disabled = false;
    startBtn.textContent = "Play Again";
}
