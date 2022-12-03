const Users = require("../models/Users")
const CryptoJs  = require("crypto-js")
const { validationUser } = require('../middleware/validation')
require('dotenv').config()
const secretSalt = process.env.secretSalt 

class AuthController{
    static login = async(req, res)=>{
        try {
            const user = await Users.findOne({email: req.body.email})
            if(!user) {
                return res.status(403).json({message: 'Invalid email address or password.'})
            }

            const validPassword = await CryptoJs.DES.decrypt(req.body.password, user.password)
            if(!validPassword) {
                return res.status(400).json({message: 'Invalid  password.'})
            }

            const token = user.gerenateAuthToken()
            return res.status(200).json({data : token, message: 'Signing successfully.'})
        } catch (error) {
            return res.status(400).json({message: 'Invalid  login credentials.'})
        }
    }

    static register  = async(req, res) => {
        const newUser = new Users({
            name : req.body.name,
            email : req.body.email,
            password : CryptoJs.AES.encrypt(req.body.password, secretSalt).toString(),
            gender : req.body.gender,
            birth_date : req.body.birth_date,
        })
        try {
            
            const {error} = validationUser(req.body)
            if (error) res.status(400).json({message: error.details[0].message})
    
            const user = await Users.findOne({email: req.body.email})
            if (user) {
                return res.status(403).json({message: 'User with email already exists'})
            }
            const registerUser = await newUser.save()
            return res.status(201).json(registerUser)
        } catch (error) {
            return res.status(404).json({message: error.message})
        }
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