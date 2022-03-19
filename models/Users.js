const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : { type: String, required: true},
    email : { type: String, required: true, unique: true},
    password : { type: String, required: true},
    gender : { type: String, required: true},
    month : { type: String, required: true},
    date : { type: String, required: true},
    yer : { type: String, required: true},
    likedSongs : { type: [String], default: []},
    playlist : { type: [String], default: []},
    isAdmin : { type: Boolean, default: false}
})


const Users = mongoose.model('users', userSchema)

module.exports = Users