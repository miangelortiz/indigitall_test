const { createLogger, format, transports } = require('winston')
const path = require('path')

// Logger configuration
const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info', // Minimum log level
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), // Add timestamp
    format.errors({ stack: true }), // Include stack trace in errors
    format.splat(), // Allow placeholders like %s
    format.json() // JSON format for logs
  ),
  transports: [
    // Log to console with timestamp in the message
    new transports.Console({
      format: format.combine(
        format.colorize(), // Colorize logs in the console
        format.printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level}]: ${message}` // Include timestamp in the log message
        })
      )
    }),
    // Log to file with size limit and rotation
    new transports.File({
      filename: path.resolve(__dirname, '../../logs/error.log'),
      level: 'error', // Only errors are saved in this file
      maxsize: 10 * 1024 * 1024, // Maximum file size: 10 MB
      maxFiles: 5 // Keep a maximum of 5 rotated files
    }),
    new transports.File({
      filename: path.resolve(__dirname, '../../logs/combined.log'),
      maxsize: 10 * 1024 * 1024, // Maximum file size: 10 MB
      maxFiles: 5 // Keep a maximum of 5 rotated files
    })
  ]
})

module.exports = logger
