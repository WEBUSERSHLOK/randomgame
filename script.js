const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 250;

let score = 0;
let balls = 0;
let wickets = 0;
let isBatting = true;
let ballPosition = { x: 0, y: 150, dx: 2, dy: 0 }; // Ball starting position

const hitBtn = document.getElementById('hitBtn');
const resetBtn = document.getElementById('resetBtn');
const scoreboard = document.getElementById('scoreboard');
const message = document.getElementById('message');
const gameMessage = document.getElementById('gameMessage');

// Draw the field
function drawField() {
    ctx.fillStyle = '#76c7c0';
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Field color
}

// Draw the batter
function drawBatter() {
    ctx.fillStyle = '#ffcc00';
    ctx.fillRect(230, 220, 40, 10); // Bat
    ctx.fillRect(240, 200, 20, 20); // Body
}

// Draw the ball
function drawBall() {
    ctx.fillStyle = '#ff0000';
    ctx.beginPath();
    ctx.arc(ballPosition.x, ballPosition.y, 5, 0, Math.PI * 2);
    ctx.fill();
}

// Simulate bowling action
function bowlBall() {
    if (ballPosition.x > canvas.width) {
        ballPosition.x = 0;
        ballPosition.y = Math.random() * 200 + 50; // Randomize y position of the ball
        ballPosition.dx = 2 + Math.random() * 3; // Randomize ball speed
        balls++;
        updateScoreboard();
        checkOut();
    }

    ballPosition.x += ballPosition.dx;
    ballPosition.y += ballPosition.dy;
}

// Check if the batter is out
function checkOut() {
    if (ballPosition.x >= 230 && ballPosition.x <= 270 && ballPosition.y >= 220) {
        let runs = Math.floor(Math.random() * 7); // Random runs (0 to 6)
        score += runs;

        if (runs === 0) {
            wickets++;
            if (wickets === 3 || balls === 6) {
                endGame();
            }
        }
    }
}

// Update the scoreboard
function updateScoreboard() {
    scoreboard.innerHTML = `Score: ${score} | Balls: ${balls} | Wickets: ${wickets}`;
}

// End the game
function endGame() {
    gameMessage.innerHTML = `Game Over! Final Score: ${score}`;
    message.style.display = 'block';
    hitBtn.disabled = true;
    resetBtn.classList.remove('hidden');
}

// Reset the game
resetBtn.addEventListener('click', () => {
    score = 0;
    balls = 0;
    wickets = 0;
    ballPosition.x = 0;
    ballPosition.y = 150;
    ballPosition.dx = 2;
    hitBtn.disabled = false;
    message.style.display = 'none';
    resetBtn.classList.add('hidden');
    updateScoreboard();
    gameLoop();
});

// Batting action on hitting the ball
hitBtn.addEventListener('click', () => {
    bowlBall();
    ballPosition.x = 0;
    ballPosition.y = Math.random() * 200 + 50;
    ballPosition.dx = 2 + Math.random() * 3;
});

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawField();
    drawBatter();
    drawBall();
    bowlBall();

    if (wickets < 3 && balls < 6) {
        requestAnimationFrame(gameLoop);
    }
}

gameLoop();