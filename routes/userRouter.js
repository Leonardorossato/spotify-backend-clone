const express = require('express')
const UserController = require('../controllers/userController')
const router = express.Router()

router.post('/user', UserController)

module.exports = router