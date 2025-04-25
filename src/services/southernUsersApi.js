const logger = require('../config/loggerConfig')

/**
 * Function to simulate sending user data to an external API
 * @param {*} data - User data to be sent
 * @returns {Promise} - A promise that resolves after a delay
 */
const insertUser = (data) => {
  logger.info('Sending user data to external API')
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
}

module.exports = {
  insertUser
}
