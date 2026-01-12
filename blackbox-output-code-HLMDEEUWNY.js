const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Ball properties
let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 20,
    dx: 0,
    dy: 0,
    speed: 5
};

// Draw ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = '#fff'; // White ball
    ctx.fill();
    ctx.closePath();
}

// Update ball position
function update() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    // Bounce off walls
    if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) ball.dx = -ball.dx;
    if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) ball.dy = -ball.dy;
}

// Handle keyboard input
document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp': ball.dy = -ball.speed; break;
        case 'ArrowDown': ball.dy = ball.speed; break;
        case 'ArrowLeft': ball.dx = -ball.speed; break;
        case 'ArrowRight': ball.dx = ball.speed; break;
    }
});

document.addEventListener('keyup', (e) => {
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) ball.dy = 0;
    if (['ArrowLeft', 'ArrowRight'].includes(e.key)) ball.dx = 0;
});

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    update();
    drawBall();
    requestAnimationFrame(gameLoop);
}

gameLoop();