import IllegalArgumentError from '../error/illegal-argument-error.js'

export default class GreetingService {
  #log = null

  constructor(logger = console) {
    this.#log = logger
  }

  createGreeting(greeting, name) {
    if (name.match(/^.*[0-9].*$/)) {
      this.#log.error(`Validation failed: ${name} contains number`)
      throw new IllegalArgumentError('Invalid name')
    }
    this.#log.info(`greeting created for ${name}`)
    return `${greeting} ${name}!`
  }
}
