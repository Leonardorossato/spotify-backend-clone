const jwt = require('jsonwebtoken')
const passwordComplexity = require('joi-password-complexity')
const Joi = require('joi')
require('dotenv').config()
const privateKey = process.env.privateKey


const gerenateAuthToken = ()=>{
    const token = jwt.sign({
        _id: this._id,
        name: this.name,
        isAdmin: this.isAdmin,
    },{privateKey}, {expiresIn: '7d'})
    return token
}

const validationUser = (user) =>{
    const schema = Joi.object({
        name: Joi.string().min(5).max(100).required(),
        email: Joi.string().email().required(),
        password: passwordComplexity().required(),
        month: Joi.string().required(),
        date: Joi.string().required(),
        year: Joi.string().required(),
        gender: Joi.string().valid("male", "female", "non-binary").required(),
    })
    return schema.validate(user)
}

const validationSongs = (song) =>{
    const schema = Joi.object({
        name: Joi.string().required(),
        artist: Joi.string().required(),
        song: Joi.string().required(),
        img: Joi.string().required(),
        duration: Joi.string().required(),
    })
    return schema.validate(song)
}

module.exports = {gerenateAuthToken, validationUser, validationSongs}