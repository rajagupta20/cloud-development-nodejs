'use strict';

const Server = require('./server');
const PORT = 3000;

const server = new Server();
server.start(PORT);
