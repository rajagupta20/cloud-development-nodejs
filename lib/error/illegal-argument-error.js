export default class IllegalArgumentError extends Error {
  constructor(message = 'Illegal argument') {
    // pass nessage to parent constructor
    super(message)
    // assign the error class name in your custom error (as a shortcut)
    this.name = this.constructor.name
    // capturing the stack trace keeps the reference to your error class (only available on V8)
    Error.captureStackTrace(this, this.constructor)
    // Bad Request
    this.code = 400
  }
}
