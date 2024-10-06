import { jest } from '@jest/globals';

document.body.innerHTML = `
  <canvas id="gameCanvas"></canvas>
`;

const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

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

// Tests

test('Player should move left when ArrowLeft is pressed', () => {
    const initialX = player.x;
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    document.dispatchEvent(event);
    expect(player.x).toBe(initialX - player.dx);
});

test('Player should move right when ArrowRight is pressed', () => {
    const initialX = player.x;
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    document.dispatchEvent(event);
    expect(player.x).toBe(initialX + player.dx);
});