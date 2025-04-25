const bcrypt = require('bcrypt')

/**
 * Hash a password using bcrypt library
 * @param {*} password Password to hash
 * @returns {Promise<string>} Hashed password
 */
const hashPassword = async (password) => {
  try {
    // Check if password is empty, null, undefined, or not a string
    if (!password || typeof password !== 'string') {
      throw new Error('Invalid password')
    }
    // Generate a salt and hash the password
    // The cost factor is set to 10, which is a good balance between security and performance
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  } catch (error) {
    throw new Error('Failed to hash password')
  }
}

module.exports = hashPassword
