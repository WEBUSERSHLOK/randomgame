const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');

        const gridSize = 20; // size of grid cells
        let snake = [{x: 9 * gridSize, y: 9 * gridSize}]; // initial snake position
        let food = {x: 5 * gridSize, y: 5 * gridSize}; // initial food position
        let dx = gridSize; // initial horizontal direction
        let dy = 0; // initial vertical direction
        let score = 0;

        function gameLoop() {
            updateSnakePosition();
            if (checkCollisions()) {
                alert('Game Over! Your score: ' + score);
                resetGame();
            } else {
                clearCanvas();
                drawFood();
                drawSnake();
                updateScore();
                moveSnake();
                setTimeout(gameLoop, 100); // keep the game running
            }
        }

        function clearCanvas() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }

        function drawSnake() {
            ctx.fillStyle = 'green';
            snake.forEach((segment) => {
                ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
            });
        }

        function moveSnake() {
            const head = {x: snake[0].x + dx, y: snake[0].y + dy};
            snake.unshift(head);

            if (head.x === food.x && head.y === food.y) {
                score++;
                generateNewFood();
            } else {
                snake.pop();
            }
        }

        function generateNewFood() {
            food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
            food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
        }

        function drawFood() {
            ctx.fillStyle = 'red';
            ctx.fillRect(food.x, food.y, gridSize, gridSize);
        }

        function updateScore() {
            ctx.fillStyle = 'black';
            ctx.font = '16px Arial';
            ctx.fillText('Score: ' + score, 10, 20);
        }

        function checkCollisions() {
            const head = snake[0];
            // Check wall collisions
            if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
                return true;
            }
            // Check self-collision
            for (let i = 1; i < snake.length; i++) {
                if (snake[i].x === head.x && snake[i].y === head.y) {
                    return true;
                }
            }
            return false;
        }

        function updateSnakePosition() {
            document.addEventListener('keydown', (event) => {
                if (event.key === 'ArrowUp' && dy === 0) {
                    dx = 0;
                    dy = -gridSize;
                } else if (event.key === 'ArrowDown' && dy === 0) {
                    dx = 0;
                    dy = gridSize;
                } else if (event.key === 'ArrowLeft' && dx === 0) {
                    dx = -gridSize;
                    dy = 0;
                } else if (event.key === 'ArrowRight' && dx === 0) {
                    dx = gridSize;
                    dy = 0;
                }
            });
        }

        function resetGame() {
            snake = [{x: 9 * gridSize, y: 9 * gridSize}];
            food = {x: 5 * gridSize, y: 5 * gridSize};
            dx = gridSize;
            dy = 0;
            score = 0;
            gameLoop();
        }

        gameLoop(); // Start the game
    </script>
</body>
</html>
