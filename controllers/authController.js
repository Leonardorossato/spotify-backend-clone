const Users = require("../models/Users")
const bcrypt = require("bcrypt")
const { validationUser } = require('../middleware/validation')
require('dotenv').config()
const secretSalt = process.env.secretSalt 

class AuthController{
    static loginUserCredentials = async(req, res)=>{
       const user = await Users.findOne({email: req.body.email})
       if(!user) return res.status(403).json({message: 'Invalid email address or password.'})

       const validPassword = await bcrypt.compare(req.body.password, user.password)
       if(!validPassword) return res.status(400).json({message: 'Invalid email or password.'})

       const token = user.gerenateAuthToken()
       return res.status(200).json({data : token, message: 'Signing please wait'})
    }

    static registerCredentials  = async(req, res) => {
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

        return res.status(201).json(newUser)
    }

    static updateUser = async(req, res) => {
        try {
            const user = await Users.findByIdAndUpdate(req.params.id,{
                $set: req.body
            }, {new: true}).select("-password -__v")
            return res.status(200).json({data: user})
        } catch (error) {
            return res.status(500).json({data: {error: error.message}})
        }
    }
}

module.exports = AuthController