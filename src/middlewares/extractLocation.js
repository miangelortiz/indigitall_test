const geoip = require('geoip-lite')
const logger = require('../config/loggerConfig')

/**
 * Extracts the location of the client based on the IP address.
 * If the IP is localhost, it simulates the location in Málaga for testing purposes.
 * @param {*} req request object
 * @param {*} res response object
 * @param {*} next next middleware function
 */
const extractLocation = async (req, res, next) => {
  try {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

    // If the IP is localhost, we simulate the location in Málaga for this purpose.
    if (ip === '127.0.0.1' || ip === '::1') {
      logger.warn('Localhost IP detected, simulating location in Málaga for the purpose of the test.')
      req.latitude = 36.72016
      req.longitude = -4.42034
      return next()
    }

    // If there are multiple IPs in x-forwarded-for, take the first one
    if (ip && ip.includes(',')) {
      ip = ip.split(',')[0].trim()
    }

    logger.info('Client IP:', ip)

    const geo = geoip.lookup(ip)
    logger.info('Geo information:', geo)

    if (geo) {
      req.latitude = geo.ll[0]
      req.longitude = geo.ll[1]
    } else {
      logger.warn('No location found for IP:', ip)
    }

    next()
  } catch (error) {
    logger.error('Error extracting location:', error.message)
    next()
  }
}

module.exports = extractLocation
