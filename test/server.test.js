'use strict';

const request = require('supertest');
const assert = require('assert');
const ExpressServer = require('../src/server');

describe('server', () => {
  let server;
  let baseUrl;

  before(async () => {
    server = new ExpressServer();
    const port = await server.start(0);

    baseUrl = request(`http://localhost:${port}`);
  });

  after(() => server.stop());

  it('should return hello greeting', async () => {
    const response = await baseUrl.get('/hello')
      .expect(200);
    assert.equal(response.text, 'Hello world!');
  });

  it('should return hello greeting with name parameter', async () => {
    const response = await baseUrl.get('/hello?name=Neo')
      .expect(200);
    assert.equal(response.text, 'Hello Neo!');
  });

  it('should return howdy greeting', async () => {
    const response = await baseUrl.get('/howdy')
      .expect(200);
    assert.equal(response.text, 'Howdy world!');
  });

  it('should return howdy greeting with name parameter', async () => {
    const response = await baseUrl.get('/howdy?name=Neo')
      .expect(200);
    assert.equal(response.text, 'Howdy Neo!');
  });

  it('should return 400 when name contains a number', async () => {
    const response = await baseUrl.get('/hello?name=withNumb3r')
      .expect(400);
  });
})