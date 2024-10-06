const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {
    x: canvas.width / 2,
    y: canvas.height - 30,
    width: 50,
    height: 10,
    dx: 5
};

function drawPlayer() {
    context.fillStyle = 'white';
    context.fillRect(player.x, player.y, player.width, player.height);
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
    clearCanvas();
    drawPlayer();
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && player.x > 0) {
        player.x -= player.dx;
    } else if (event.key === 'ArrowRight' && player.x < canvas.width - player.width) {
        player.x += player.dx;
    }
});

setInterval(update, 1000 / 60); // 60 FPS

document.addEventListener('DOMContentLoaded', () => {
    context.fillStyle = 'white';
    context.font = '30px Arial';
    context.fillText('Space Invaders', canvas.width / 2 - 100, canvas.height / 2);
});