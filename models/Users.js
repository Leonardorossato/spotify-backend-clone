const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const privateKey = process.env.privateKey

const userSchema = new mongoose.Schema({
    name : { type: String, required: true},
    email : { type: String, required: true, unique: true},
    password : { type: String, required: true},
    gender : { type: String, required: true},
    month : { type: String, required: true},
    date : { type: Date,required: true},
    likedSongs : { type: [String], default: []},
    playlist : { type: [String], default: []},
    isAdmin : { type: Boolean, default: false}
})

userSchema.methods.gerenateAuthToken = ()=> {
    const token = jwt.sign({
        _id: this._id,
        name: this.name,
        isAdmin: this.isAdmin
    }, privateKey, {expiresIn: '1d'})

    return token
}

const Users = mongoose.model('users', userSchema)

module.exports = Users