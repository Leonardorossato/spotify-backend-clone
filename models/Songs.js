const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    name : { type: String, required: true},
    artist : { type: String, required: true},
    password : { type: String, required: true},
    song : { type: String, required: true},
    img : { type: String, required: true},
    duration : { type: String, required: true},
})

const Songs = mongoose.model('songs', songSchema)

module.exports = Songs