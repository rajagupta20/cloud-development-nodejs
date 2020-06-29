'use strict';

const express = require('express');
const GreetingFactory = require('./greeting-factory');

module.exports = function Server() {

  const { createGreeting } = new GreetingFactory();
  const app = express();
  let httpServer;

  app.get('/hello', (req, res) => {
    const name = req.query.name || 'World';
    try {
      const greeting = createGreeting('Hello', name);
      return res.send(greeting);
    } catch (err) {
      return res.status(400).end();
    }
  });

  app.get('/howdy', (req, res) => {
    const name = req.query.name || 'World';
    console.error('Deprecated endpoint used!');
    try {
      const greeting = createGreeting('Howdy', name);
      return res.send(greeting);
    } catch (err) {
      return res.status(400).end();
    }
  });

  this.start = (port) => {
    return new Promise((resolve, reject) => {
      httpServer = app.listen(port, () => {
        console.log(`Server started on port ${port}`);
        resolve(httpServer.address().port);
      })
      httpServer.on('error', reject);
    });
  };
  
  this.stop = () => {
    return new Promise((resolve) => {
      httpServer.close(resolve);
    });
  }
};
