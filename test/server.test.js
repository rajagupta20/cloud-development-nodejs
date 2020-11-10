'use strict';

const request = require('supertest');
const assert = require('assert');
const ExpressServer = require('../src/server');

describe('server', () => {
  let server;
  let baseUrl;

  before(async () => {
    server = new ExpressServer(console);
    const port = await server.start(0);

    baseUrl = request(`http://localhost:${port}`);
  });

  after(() => server.stop());

  describe('hello', () => {
    const route = '/hello';

    it('should return greeting', async () => {
      const response = await baseUrl.get(route)
        .expect(200);
      assert.strictEqual(response.text, 'Hello World!');
    });
    
    it('should return hello greeting with name parameter', async () => {
      const response = await baseUrl.get(`${route}?name=Neo`)
        .expect(200);
      assert.strictEqual(response.text, 'Hello Neo!');
    });
    
    it('should return 400 when name contains a number', async () => {
      await baseUrl.get(`${route}?name=withNumb3r`)
        .expect(400);
    });
  });
  
  describe('howdy', () => {
    const route = '/howdy';
    it('should return greeting', async () => {
      const response = await baseUrl.get(route)
        .expect(200);
      assert.strictEqual(response.text, 'Howdy World!');
    });
    
    it('should return greeting with name parameter', async () => {
      const response = await baseUrl.get(`${route}?name=Neo`)
        .expect(200);
      assert.strictEqual(response.text, 'Howdy Neo!');
    });

    it('should return 400 when name contains a number', async () => {
      await baseUrl.get(`${route}?name=withNumb3r`)
        .expect(400);
    });
  });
});