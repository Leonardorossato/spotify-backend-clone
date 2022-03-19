const bcrypt = require('bcrypt')
const { validationUser } = require('../middleware/authentication')
const Users = require('../models/Users')
require('dotenv').config()
const secretSalt = process.env.secretSalt 

class UserController{
    static createUser  = async(req, res) => {
        const {error} = validationUser(req.body)
        if (error) res.status(400).json({message: error.details[0].message})

        const user = await Users.findOne({email: req.body.email})
        if (user) {
            return res.status(403).json({message: 'User with email already exists'})
        }
        const salt = await bcrypt.genSalt(Number(secretSalt))
        const hashPassword = await bcrypt.hash(req.body.password, salt)
        let newUser = await Users({
            ...req.body,
            password: hashPassword
        }).save()

        newUser.password = undefined
        newUser.__v = undefined

        return res.status(201).json(user)
    }
}

module.exports = UserController