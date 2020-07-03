'use strict';

const express = require('express');
const GreetingService = require('./greeting-service');

module.exports = class Server {
  app;
  httpServer;
  logger;

  constructor(logger) {
    this.logger = logger;
    this.app = express();

    this.app.get('/hello', (req, res) => {
      const greetingService = new GreetingService(console);
      const name = req.query.name || 'World';
      try {
        const greeting = greetingService.createGreeting('Hello', name);
        return res.send(greeting);
      } catch (err) {
        return res.status(400).end();
      }
    });

    this.app.get('/howdy', (req, res) => {
      const greetingService = new GreetingService(console);
      const name = req.query.name || 'World';
      console.error('Deprecated endpoint used!');
      try {
        const greeting = greetingService.createGreeting('Howdy', name);
        return res.send(greeting);
      } catch (err) {
        return res.status(400).end();
      }
    });
  }

  start(port) {
    return new Promise((resolve, reject) => {
      this.httpServer = this.app.listen(port, () => {
        resolve(this.httpServer.address().port);
      })
      this.httpServer.on('error', reject);
    });
  };
  
  stop() {
    return new Promise((resolve) => {
      this.httpServer.close(resolve);
    });
  }
};
