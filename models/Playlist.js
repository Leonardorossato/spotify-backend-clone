const mongoose = require('mongoose')

const playlistSchema = new mongoose.Schema({
    name : { type: String, required: true},
    description: { type: String, required: true},
    songs : { type: Array, default: []},
    img : { type: String, required: true},
    userId : {type: mongoose.Types.ObjectId, ref: 'users', required: true},
})

const Playlists = mongoose.model('playlist', playlistSchema)

module.exports = Playlists