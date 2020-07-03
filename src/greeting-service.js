'use strict';
/* This file does not need to be changed in order to complete the exercises*/
module.exports = class GreetingService {

  constructor(logger) {
    this.logger = logger;
  }

  createGreeting(greeting, name) {

    if (name.match(/^.*[0-9].*$/)) {
      this.logger.error(`Validation failed: ${name} contains number`);
      throw new Error('Invalid name');
    }

    this.logger.info(`greeting created for ${name}`);
    return `${greeting} ${name}!`;
  }
}
