const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/authController')
const UserController = require('../controllers/userController')
const {authenticationTokenUser, authenticationTokenAdmin} = require('../middleware/authentication')
const validObjectId = require('../middleware/validObjectId')

//rotas que o usuario tem permissão de usar
router.post('/register', AuthController.registerCredentials)
router.post('/login', AuthController.loginUserCredentials)
router.put('/update/:id', authenticationTokenUser, validObjectId, UserController.UpdateUser)

//rotas que o admin tem permissão para usar
router.delete('/user/:id',authenticationTokenUser ,authenticationTokenAdmin, UserController.deleteUser)
router.get('/all',authenticationTokenAdmin,UserController.getAllUsers)
router.get('/admin/:id',authenticationTokenAdmin,validObjectId ,UserController.getUsersById)

module.exports = router