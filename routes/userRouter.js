const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/authController')
const UserController = require('../controllers/userController')
const {authenticationTokenUser, authenticationTokenAdmin} = require('../middleware/authentication')
const validObjectId = require('../middleware/validObjectId')

//rotas que o usuario tem permissão de usar
router.post('/user', UserController.createUser)
router.post('/login', AuthController.loginUserCredentials)
router.put('/user/:id', authenticationTokenUser, validObjectId, UserController.updateUser)

//rotas que o admin tem permissão para usar
router.delete('/admin/:id', authenticationTokenAdmin, UserController.deleteUser)
router.get('/admin',authenticationTokenAdmin ,UserController.getAllUsers)
router.get('/admin/:id',authenticationTokenAdmin,validObjectId ,UserController.getUsersById)
module.exports = router