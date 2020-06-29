'use strict';
/* This file does not need to be changed in order to complete the exercises*/
module.exports = class GreetingFactory {

  constructor(logger = console) {
    this.logger = logger;
  }

  createGreeting = (greeting, name, logger = this.logger) => {

    if (name.match(/^.*[0-9].*$/)) {
      logger.error(`Validation failed: ${name} contains number`);
      throw new Error('Invalid name');
    }

    logger.info(`greeting created for ${name}`);
    return `${greeting} ${name}!`;
  }
}
