import sinon from 'sinon'
import assert from 'assert/strict'
import logger from '../lib/util/logger.js'
import GreetingService from '../lib/service/greeting-service.js'
import IllegalArgumentError from '../lib/error/illegal-argument-error.js'

describe('greeting-service', () => {
  const sandbox = sinon.createSandbox()

  let greetingService = null

  beforeEach(() => {
    const loggerStub = sandbox.stub(logger)
    if (loggerStub.child) {
      loggerStub.child.returnsThis()
    }
    greetingService = new GreetingService(loggerStub)
  })

  afterEach(() => {
    sandbox.restore()
  })

  it('should throw an Invalid name error', () => {
    const error = new IllegalArgumentError('Invalid name')
    assert.throws(() => greetingService.createGreeting('Hello', '007'), error)
  })

  it('should create a greeting', () => {
    const greeting = 'Hello'
    const name = 'James'
    const result = greetingService.createGreeting(greeting, name)
    assert.equal(result, `${greeting} ${name}!`)
  })
})
