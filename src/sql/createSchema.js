const db = require('../lib/db')
const fs = require('fs')
const path = require('path')
const logger = require('../config/loggerConfig')

/**
 * Create the database schema
 */
const createSchema = async () => {
  const databasePath = path.resolve(__dirname, '../../data/database.db')
  const dbClient = await db.getClient()
  const schemaPath = path.resolve(__dirname, 'createSchema.sql')
  const schema = fs.readFileSync(schemaPath, 'utf-8')

  // Variable to indicate if an error occurred
  let schemaError = false

  try {
    logger.info('- LOADING SCHEMA -')
    // Init transaction
    await dbClient.exec('BEGIN TRANSACTION;')
    await dbClient.exec(schema)
    // Commit transaction
    await dbClient.exec('COMMIT;')
    logger.info('Schema loaded successfully.')
  } catch (error) {
    // Rollback transaction in case of error
    await dbClient.exec('ROLLBACK;')
    logger.error('Error loading schema:', error.message)
    // an error occurred
    schemaError = true
    throw error
  } finally {
    // Close database connection
    await dbClient.close()
    logger.info('Database connection closed.')

    // Delete database file if an error occurred
    if (schemaError && fs.existsSync(databasePath)) {
      try {
        fs.unlinkSync(databasePath)
        logger.info('Removing the database file...')
      } catch (unlinkError) {
        logger.error('Error deleting database file:', unlinkError.message)
      }
    }
  }
}

createSchema()
  .then(() => {
    logger.info('Finished OK')
  })
  .catch((error) => {
    logger.info('Finished KO:', error.message)
  })
