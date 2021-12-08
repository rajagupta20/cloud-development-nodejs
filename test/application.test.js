import assert from 'assert/strict'
import sinon from 'sinon'
import supertest from 'supertest'
import { STATUS_CODES } from 'http'
import logger from '../lib/util/logger.js'
import GreetingService from '../lib/service/greeting-service.js'
import IllegalArgumentError from '../lib/error/illegal-argument-error.js'
import application from '../lib/application.js'

describe('application', () => {
  const sandbox = sinon.createSandbox()

  let loggerStub = null
  let greetingServiceStub = null
  let client = null

  beforeEach(() => {
    loggerStub = sandbox.stub(logger)
    if (loggerStub.child) {
      loggerStub.child.returnsThis()
    }
    greetingServiceStub = sandbox.createStubInstance(GreetingService)
    const app = application(greetingServiceStub, loggerStub)
    client = supertest(app)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('hello', () => {
    it('should return hello greeting', async () => {
      greetingServiceStub
        .createGreeting
        .withArgs('Hello', 'World')
        .returns('Hello World!')

      const { text } =
        await client
          .get('/hello')
          .expect(200)

      assert.equal(text, 'Hello World!')
    })

    it('should return hello greeting with name parameter', async () => {
      greetingServiceStub
        .createGreeting
        .withArgs('Hello', 'Neo')
        .returns('Hello Neo!')

      const { text } =
        await client
          .get('/hello')
          .query({ name: 'Neo' })
          .expect(200)

      assert.equal(text, 'Hello Neo!')
    })

    it('should return Bad Request (400) when name contains a number', async () => {
      const error = new IllegalArgumentError('Invalid name')

      greetingServiceStub
        .createGreeting
        .withArgs('Hello', 'N3o')
        .throws(error)

      const { text } = await client
        .get('/hello')
        .query({ name: 'N3o' })
        .expect(error.code)

      assert.equal(text, STATUS_CODES[error.code])
    })
  })

  describe('howdy', () => {
    it('should return howdy greeting', async () => {
      greetingServiceStub
        .createGreeting
        .withArgs('Howdy', 'World')
        .returns('Howdy World!')

      const { text } =
        await client
          .get('/howdy')
          .expect(200)

      assert.equal(text, 'Howdy World!')
    })

    it('should return howdy greeting with name parameter', async () => {
      greetingServiceStub
        .createGreeting
        .withArgs('Howdy', 'Neo')
        .returns('Howdy Neo!')

      const { text } =
        await client
          .get('/howdy')
          .query({ name: 'Neo' })
          .expect(200)

      assert.equal(text, 'Howdy Neo!')
    })

    it('should return Bad Request (400) when name contains a number', async () => {
      const error = new Error('Invalid name')
      error.code = 400

      greetingServiceStub
        .createGreeting
        .withArgs('Howdy', 'N3o')
        .throws(error)

      const { text } = await client
        .get('/howdy')
        .query({ name: 'N3o' })
        .expect(error.code)

      assert.equal(text, STATUS_CODES[error.code])
    })
  })
})
