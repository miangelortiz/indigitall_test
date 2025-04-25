/**
 * Middleware to validate user input for registration
 * @param {*} req request object
 * @param {*} res response object
 * @param {*} next next function to call the next middleware
 * @returns 400 if there is a validation error
 */
const validateUserInput = (req, res, next) => {
  const { username, email, password } = req.body

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' })
  }

  next()
}

module.exports = validateUserInput
