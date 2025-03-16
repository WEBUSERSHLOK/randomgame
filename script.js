let overs = 0;
let score = 0;
let balls = 0;
let wickets = 0;
let currentPlayer = 1;
let isBatting = false;
let maxOvers = 5;
let isGameOver = false;

const oversInput = document.getElementById('oversInput');
const startBtn = document.getElementById('startBtn');
const batBtn = document.getElementById('batBtn');
const bowlBtn = document.getElementById('bowlBtn');
const hitBtn = document.getElementById('hitBtn');
const bowlBallBtn = document.getElementById('bowlBallBtn');
const result = document.getElementById('result');
const scoreDisplay = document.getElementById('score');
const ballsDisplay = document.getElementById('balls');
const wicketsDisplay = document.getElementById('wickets');
const oversDisplay = document.getElementById('oversDisplay');
const currentPlayerDisplay = document.getElementById('currentPlayer');
const gamePlayArea = document.getElementById('gamePlayArea');

// Start Game
startBtn.addEventListener('click', () => {
    maxOvers = parseInt(oversInput.value);
    overs = 0;
    score = 0;
    balls = 0;
    wickets = 0;
    isGameOver = false;
    gamePlayArea.classList.remove('hidden');
    result.textContent = 'Choose to Bat or Bowl!';
    startBtn.disabled = true;
    batBtn.classList.remove('hidden');
    bowlBtn.classList.remove('hidden');
});

// Batting & Bowling Modes
batBtn.addEventListener('click', () => {
    isBatting = true;
    result.textContent = `You are batting!`;
    batBtn.classList.add('hidden');
    bowlBtn.classList.add('hidden');
    hitBtn.classList.remove('hidden');
});

bowlBtn.addEventListener('click', () => {
    isBatting = false;
    result.textContent = `You are bowling!`;
    batBtn.classList.add('hidden');
    bowlBtn.classList.add('hidden');
    bowlBallBtn.classList.remove('hidden');
});

// Batting Logic
hitBtn.addEventListener('click', () => {
    if (balls < maxOvers * 6 && wickets < 3) {
        const runs = Math.floor(Math.random() * 7); // Runs between 0-6
        score += runs;
        balls++;
        updateGameInfo();
        result.textContent = `Player ${currentPlayer} hit ${runs} runs!`;

        if (runs === 0) {
            wickets++;
            result.textContent = `Player ${currentPlayer} is out!`;
            currentPlayer++;
            if (currentPlayer > 2) {
                currentPlayer = 1;
            }
        }
    } else {
        result.textContent = `Game Over! Final Score: ${score} runs, ${wickets} wickets`;
        endGame();
    }
});

// Bowling Logic
bowlBallBtn.addEventListener('click', () => {
    if (balls < maxOvers * 6 && wickets < 3) {
        const outcome = Math.floor(Math.random() * 6); // Ball outcome (0 - Wicket or 1-5 runs)
        balls++;
        updateGameInfo();

        if (outcome === 0) {
            wickets++;
            result.textContent = `Wicket! Player ${currentPlayer} is out!`;
            currentPlayer++;
            if (currentPlayer > 2) {
                currentPlayer = 1;
            }
        } else {
            score += outcome;
            result.textContent = `Player ${currentPlayer} bowled ${outcome} runs!`;
        }
    } else {
        result.textContent = `Game Over! Final Score: ${score} runs, ${wickets} wickets`;
        endGame();
    }
});

// Update Game Info
function updateGameInfo() {
    scoreDisplay.textContent = score;
    ballsDisplay.textContent = balls;
    wicketsDisplay.textContent = wickets;
    oversDisplay.textContent = Math.floor(balls / 6);
    currentPlayerDisplay.textContent = `Player ${currentPlayer}`;
}

// End Game Logic
function endGame() {
    isGameOver = true;
    hitBtn.classList.add('hidden');
    bowlBallBtn.classList.add('hidden');
    startBtn.disabled = false;
    startBtn.textContent = 'Play Again';
}
