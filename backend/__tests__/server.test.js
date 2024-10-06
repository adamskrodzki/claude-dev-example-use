const request = require('supertest');
const express = require('express');

const app = express();
app.get('/', (req, res) => {
  res.status(200).send('Space Invaders Backend');
});

// Tests

describe('GET /', () => {
  it('responds with Space Invaders Backend', (done) => {
    request(app)
      .get('/')
      .expect('Content-Type', /text/)
      .expect(200, 'Space Invaders Backend', done);
  });
});