const sqlite3 = require('sqlite3')
const { open } = require('sqlite')
const path = require('path')
const fs = require('fs')
const logger = require('../config/loggerConfig')

class SQLiteDb {
  #client = null

  // Define the database filename and path
  static #databaseFilename = (() => {
    const databasePath = process.env.DATABASE_PATH || path.resolve(__dirname, '../../data/database.db')
    const dataDir = path.dirname(databasePath)

    // Make sure the directory exists before creating the database file
    // If the directory does not exist, create it
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    return databasePath
  })()

  constructor () {
    this.#client = open({
      filename: SQLiteDb.#databaseFilename,
      driver: sqlite3.Database
    }).catch((err) => {
      logger.error('Error connecting to SQLite database:', err.message)
    })
  }

  async getClient () {
    return this.#client
  }
}

module.exports = new SQLiteDb()
