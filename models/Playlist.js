const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;

const playlistSchema = new mongoose.Schema({
    name : { type: String, required: true},
    user: {type: ObjectId, ref: 'users', required: true},
    description: { type: String , required: false},
    songs: { type: Array, default: [], required: false},
    img: { type: String , required: false}
})

const Playlists = mongoose.model('playlists', playlistSchema)

module.exports = Playlists