const { insertUser: insertExternalUser } = require('../services/southernUsersApi')
const { hashPassword, isSouthOrNorth, removeUndefinedKeys } = require('../utils')
const userDao = require('../dao/userDao')
const logger = require('../config/loggerConfig')

/**
 * Create a new user
 * @param {*} req request object
 * @param {*} res response object
 * @returns 201 if user is created successfully, 400 if there is a validation error, 500 if there is an internal server error
 */
const createUser = async (req, res) => {
  const { username, email, password } = req.body
  const { latitude, longitude } = req // Extracted from middleware
  const location = `${latitude},${longitude}`
  // Default language to Spanish if not provided in the request headers
  const language = req.headers['accept-language']?.split(',')[0] || 'es-ES'

  try {
    // Determinate the hemisphere
    const hemisphere = await isSouthOrNorth(latitude, longitude)
    if (!hemisphere) {
      return res.status(400).json({ error: 'Invalid location' })
    }

    // Hash the password
    const hashedPassword = await hashPassword(password)

    // If the user is in the southern hemisphere, save it in an external system via API
    if (hemisphere === 'S') {
      await insertExternalUser({
        username,
        email,
        password: hashedPassword,
        location,
        language
      })
      return res.status(201).json({ message: 'User saved in external system' })
    }

    // If the user is in the northern hemisphere, save it in our local database
    await userDao.insertUser(username, email, hashedPassword, location, language)

    res.status(201).json({ message: 'User created successfully' })
  } catch (error) {
    logger.error(error.message)

    // Handle specific error messages
    if (error.message === 'Failed to hash password') {
      return res.status(500).json({ error: 'Password hashing failed.' })
    }
    if (error.message.includes('UNIQUE constraint failed: users.email')) {
      return res.status(400).json({ error: 'Email already exists' })
    }

    return res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Get all users
 * @param {*} req request object
 * @param {*} res response object
 * @returns 200 if users are retrieved successfully, 500 if there is an internal server error
 */
const getUsers = async (req, res) => {
  try {
    const users = await userDao.getAllUsers()
    users.forEach((user) => delete user.password) // Remove sensitive data
    return res.status(200).json(users)
  } catch (error) {
    logger.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Update a user
 * @param {*} req request object
 * @param {*} res response object
 * @returns 200 if user is updated successfully, 404 if user is not found, 400 if there is a validation error, 500 if there is an internal server error
 */
const updateUser = async (req, res) => {
  const { id } = req.params
  const { username, email } = req.body

  try {
    const getUser = await userDao.getUserById(id)
    if (!getUser) {
      return res.status(404).json({ error: 'User not found' })
    }
    // make an object with the possible values
    const user = {
      username,
      email
    }
    // remove the undefined values from the object
    const userToUpdate = await removeUndefinedKeys(user)
    const userUpdated = await userDao.updateUser(id, userToUpdate)
    if (!userUpdated) {
      logger.error('No rows affected')
      return res.status(400).json({ error: 'No rows affected' })
    }
    res.status(200).json({ message: 'User updated successfully' })
  } catch (error) {
    logger.error(error)
    if (error.message.includes('UNIQUE constraint failed: users.email')) {
      return res.status(400).json({ error: 'Email already exists' })
    }
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Delete a user
 * @param {*} req request object
 * @param {*} res response object
 * @returns 200 if user is deleted successfully, 404 if user is not found, 400 if there is a validation error, 500 if there is an internal server error
 */
const deleteUser = async (req, res) => {
  const { id } = req.params

  try {
    const getUser = await userDao.getUserById(id)
    if (!getUser) {
      return res.status(404).json({ error: 'User not found' })
    }
    const userDeleted = await userDao.deleteUser(id)
    if (!userDeleted) {
      return res.status(400).json({ error: 'No rows affected' })
    }
    res.status(200).json({ message: 'User deleted successfully' })
  } catch (error) {
    logger.error(error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = {
  createUser,
  getUsers,
  updateUser,
  deleteUser
}
