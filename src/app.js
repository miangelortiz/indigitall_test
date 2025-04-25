// Load environment variables from .env file
require('dotenv').config()

const createError = require('http-errors')
const express = require('express')
const setupSwagger = require('./config/swaggerConfig')
const morgan = require('morgan')
const logger = require('./config/loggerConfig')
// Import users routes
const usersRouter = require('./routes/userRouter')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Swagger setup
setupSwagger(app)

// Token to display the parameters in the log
morgan.token('params', (req) => JSON.stringify(req.params))
// morgan.token('body', (req) => JSON.stringify(req.body))

// Middleware morgan -> logs via Winston
app.use(morgan(':method - :url - :params - :status', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}))

// users routes
app.use('/users', usersRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.send('error')
})

module.exports = app
