import GreetingService from './service/greeting-service.js'
import application from './application.js'

const { PORT = 3000 } = process.env

const greetingService = new GreetingService()
const app = application(greetingService)

app
  .on('error', ({ message }) => console.error(message))
  .listen(PORT, () => console.info(`Server started on port ${PORT}`))
