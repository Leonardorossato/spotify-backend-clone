const express = require('express')
const AuthController = require('../controllers/authController')
const UserController = require('../controllers/userController')
const router = express.Router()

router.get('/', UserController.getAllUsers)
router.post('/user', UserController.createUser)
router.post('/login', AuthController.loginUserCredentials)

module.exports = router