const board = document.getElementById("game-board");
const scoreBox = document.getElementById("score");

let snake = [{ x: 10, y: 10 }];
let food = { x: 5, y: 5 };
let dx = 1;
let dy = 0;

let score = 0;

function drawGame() {
    // Clear board
    board.innerHTML = "";

    // Draw snake
    snake.forEach(part => {
        const snakeElem = document.createElement("div");
        snakeElem.style.gridColumnStart = part.x;
        snakeElem.style.gridRowStart = part.y;
        snakeElem.classList.add("snake");
        board.appendChild(snakeElem);
    });

    // Draw food
    const foodElem = document.createElement("div");
    foodElem.style.gridColumnStart = food.x;
    foodElem.style.gridRowStart = food.y;
    foodElem.classList.add("food");
    board.appendChild(foodElem);
}

function updateSnake() {
    const head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy
    };

    snake.unshift(head);

    // Snake eats food
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreBox.innerText = score;
        placeFood();
    } else {
        snake.pop();
    }

    // Collisions
    if (head.x < 1 || head.x > 20 || head.y < 1 || head.y > 20) {
        gameOver();
    }

    // Self hit
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            gameOver();
        }
    }
}

function placeFood() {
    food.x = Math.floor(Math.random() * 20) + 1;
    food.y = Math.floor(Math.random() * 20) + 1;
}

function gameOver() {
    alert(`Game Over! Your Score: ${score}`);
    snake = [{ x: 10, y: 10 }];
    dx = 1;
    dy = 0;
    score = 0;
    scoreBox.innerText = score;
}

document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && dy !== 1) {
        dx = 0;
        dy = -1;
    } 
    else if (e.key === "ArrowDown" && dy !== -1) {
        dx = 0;
        dy = 1;
    } 
    else if (e.key === "ArrowLeft" && dx !== 1) {
        dx = -1;
        dy = 0;
    } 
    else if (e.key === "ArrowRight" && dx !== -1) {
        dx = 1;
        dy = 0;
    }
});

function gameLoop() {
    updateSnake();
    drawGame();
}

setInterval(gameLoop, 150);