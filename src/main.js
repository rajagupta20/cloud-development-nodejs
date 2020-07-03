'use strict';

const Server = require('./server');
const PORT = 3000;
const logger = console;

const server = new Server(logger);
async (() => {
  await server.start(PORT);
  console.log(`Server started on port ${PORT}`);
})();

