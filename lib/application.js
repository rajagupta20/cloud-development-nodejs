import express from 'express'
import { STATUS_CODES } from 'http'

export default (greetingService, logger = console) => {
  //const log = logger
  const log = logger.child({ module: 'application' })

  const app = express()

  app.use((req, res, next) => {
    const { method, url } = req
    log.http(`${method} ${url}`)
    next()
  })

  app.get('/hello', (req, res, next) => {
    const { query: { name = 'World' } } = req
    try {
      const greeting = greetingService.createGreeting('Hello', name)
      res
        .status(200)
        .send(greeting)
    } catch (error) {
      next(error)
    }
  })

  app.get('/howdy', (req, res, next) => {
    log.warn('Deprecated endpoint used!')
    const { query: { name = 'World' } } = req
    try {
      const greeting = greetingService.createGreeting('Howdy', name)
      res
        .status(200)
        .send(greeting)
    } catch (error) {
      next(error)
    }
  })

  app.use((error, req, res, next) => { // eslint-disable-line no-unused-vars
    const { message, code = 500 } = error
    log.error(message)
    res
      .status(code)
      .send(STATUS_CODES[code])
  })

  return app
}
