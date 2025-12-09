// index.spec.js

// ---- Fix for TextEncoder / TextDecoder ----
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
// -------------------------------------------

const request = require('supertest');
const app = require('./index');

// 1. Test root path
describe('Test root path', () => {
  it('should respond to GET / with status 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Hello');
  });
});

// 2. Test todo methods
describe('Test todo methods', () => {
  it('Returns all todos', async () => {
    const response = await request(app).get('/todo').expect(200);
    // we expect 3 todos in the array
    expect(response.body.length).toBe(3);
  });

  it('Returns a todo with id: 2', async () => {
    const response = await request(app).get('/todo/2').expect(200);
    // make sure this matches the text in index.js
    expect(response.body.name).toBe('Get pizza for dinner');
  });
});

// 3. Test responses from querying an external API
describe('Test responses from querying an external API', () => {
  it('Should retrieve a random Chuck Norris joke', async () => {
    const jokeResp = await request(app).get('/joke').expect(200);
    const joke = JSON.parse(jokeResp.text);
    expect(joke.value).toBeTruthy(); // joke text exists
  });

  it('No 2 Chuck Norris jokes will be the same', async () => {
    const jokeResp1 = await request(app).get('/joke').expect(200);
    const jokeResp2 = await request(app).get('/joke').expect(200);

    const j1 = JSON.parse(jokeResp1.text);
    const j2 = JSON.parse(jokeResp2.text);

    expect(j1.value === j2.value).toBeFalsy();
  });
});
