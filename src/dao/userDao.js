const db = require('../lib/db')

/**
 * Insert a new user into the database
 * @param {*} username user name
 * @param {*} email user email
 * @param {*} password user password
 * @param {*} location user location
 * @param {*} language user browser language
 * @returns {Promise} result of the insert operation
 */
const insertUser = async (username, email, password, location, language) => {
  const dbClient = await db.getClient()
  return dbClient.run(
    'INSERT INTO users (username, email, password, location, language) VALUES (?, ?, ?, ?, ?)',
    [username, email, password, location, language]
  )
}

/**
 * Get all users from the database
 * @returns {Promise} list of users
 */
const getAllUsers = async () => {
  const dbClient = await db.getClient()
  return dbClient.all('SELECT * FROM users')
}

/**
 * Get user by ID
 * @param {*} id user id
 * @returns {Promise} user object
 */
const getUserById = async (id) => {
  const dbClient = await db.getClient()
  return dbClient.get('SELECT * FROM users WHERE id = ?', [id])
}

/**
 * Update user
 * @param {*} id user id
 * @param {*} username user name
 * @param {*} email user email
 * @returns {Promise} result of the update operation
 */
const updateUser = async (id, userData) => {
  const dbClient = await db.getClient()
  // Extract keys and values from userData
  const keys = Object.keys(userData)
  const values = Object.values(userData)
  // Dynamically construct SET part of SQL query
  const setClause = keys.map((key) => `${key} = ?`).join(', ')
  // Add the id to the end of the values
  values.push(id)
  const result = await dbClient.run(
    `UPDATE users SET ${setClause} WHERE id = ?`,
    values
  )

  return result.changes > 0
}

/**
 * Delete a user from the database
 * @param {*} id user id
 * @returns {boolean} true if the user was deleted, false otherwise
 */
const deleteUser = async (id) => {
  const dbClient = await db.getClient()
  const result = await dbClient.run('DELETE FROM users WHERE id = ?', [id])
  return result.changes > 0
}

module.exports = {
  insertUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser
}
