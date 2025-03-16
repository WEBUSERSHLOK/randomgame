let overs = 0;
let score = 0;
let balls = 0;
let wickets = 0;
let currentPlayer = 1;

const maxOvers = 5; // Set max overs
const maxWickets = 3; // Set max wickets

const bowlBtn = document.getElementById('bowlBtn');
const hitBtn = document.getElementById('hitBtn');
const result = document.getElementById('result');
const scoreDisplay = document.getElementById('score');
const ballsDisplay = document.getElementById('balls');
const wicketsDisplay = document.getElementById('wickets');
const oversDisplay = document.getElementById('overs');
const currentPlayerDisplay = document.getElementById('currentPlayer');

bowlBtn.addEventListener('click', bowlBall);
hitBtn.addEventListener('click', hitBall);

function bowlBall() {
    if (balls < maxOvers * 6 && wickets < maxWickets) {
        const randomBallOutcome = Math.floor(Math.random() * 6); // Random outcome between 0 to 5 (no runs to 5 runs)
        balls++;
        updateGameInfo();

        if (randomBallOutcome === 0) {
            wickets++;
            result.textContent = `Wicket! Player ${currentPlayer} is out!`;
            result.style.color = 'red';
            currentPlayer++;
            if (currentPlayer > 2) {
                currentPlayer = 1;
            }
        } else {
            score += randomBallOutcome;
            result.textContent = `Player ${currentPlayer} hit ${randomBallOutcome} runs!`;
            result.style.color = '#007bff';
        }
    } else {
        result.textContent = `Game Over! Final Score: ${score} runs, ${wickets} wickets`;
        result.style.color = '#dc3545';
        bowlBtn.disabled = true;
        hitBtn.disabled = true;
    }
}

function hitBall() {
    if (balls < maxOvers * 6 && wickets < maxWickets) {
        const randomHitOutcome = Math.floor(Math.random() * 6); // Random hit outcome (runs 0 to 5)
        score += randomHitOutcome;
        balls++;
        updateGameInfo();
        result.textContent = `Player ${currentPlayer} hit ${randomHitOutcome} runs!`;
        result.style.color = '#007bff';
    } else {
        result.textContent = `Game Over! Final Score: ${score} runs, ${wickets} wickets`;
        result.style.color = '#dc3545';
        bowlBtn.disabled = true;
        hitBtn.disabled = true;
    }
}

function updateGameInfo() {
    scoreDisplay.textContent = score;
    ballsDisplay.textContent = balls;
    wicketsDisplay.textContent = wickets;
    oversDisplay.textContent = Math.floor(balls / 6);
    currentPlayerDisplay.textContent = `Player ${currentPlayer}`;
}
