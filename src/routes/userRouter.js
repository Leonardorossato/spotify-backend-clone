const express = require('express')
const AuthController = require('../controllers/authController')
const UserController = require('../controllers/userController')
const router = express.Router()

const {authenticationTokenUser, authenticationTokenAdmin} = require('../middleware/authentication')
const validObjectId = require('../middleware/validObjectId')

//rotas que o usuario tem permissão de usar
router.post('/register', AuthController.register)
router.post('/login', AuthController.login)
router.put('/update/:id', authenticationTokenUser, validObjectId, UserController.upddate)

//rotas que o admin tem permissão para usar
router.delete('/user/:id',authenticationTokenUser ,authenticationTokenAdmin, UserController.deleted)
router.get('/all',authenticationTokenAdmin,UserController.all)
router.get('/admin/:id',authenticationTokenAdmin,validObjectId ,UserController.getUsersById)

module.exports = router