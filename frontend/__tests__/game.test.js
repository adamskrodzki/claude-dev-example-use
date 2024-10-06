import { jest } from '@jest/globals';

document.body.innerHTML = `
  <canvas id="gameCanvas"></canvas>
`;

const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

context.fillStyle = 'white';
context.font = '30px Arial';
context.fillText('Space Invaders', canvas.width / 2 - 100, canvas.height / 2);

test('Canvas should be initialized with correct dimensions', () => {
    expect(canvas.width).toBe(800);
    expect(canvas.height).toBe(600);
});

test('Canvas should display placeholder text', () => {
    const text = context.measureText('Space Invaders');
    expect(text.width).toBeGreaterThan(0);
});