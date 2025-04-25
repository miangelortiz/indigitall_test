const express = require('express')
const router = express.Router()
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser
} = require('../controllers/userController')
const {
  extractLocation,
  validateUserInput
} = require('../middlewares')

router.post('/', validateUserInput, extractLocation, createUser)
router.get('/', getUsers)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router
