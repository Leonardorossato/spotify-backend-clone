const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const playlistSchema = new mongoose.Schema({
    name : { type: String, required: true},
    users: {type: ObjectId, ref: 'users', required: true},
    description: { type: String , required: false},
    songs: { type: Array, default: []},
    img: { type: String , required: false}
})

const Playlists = mongoose.model('playlists', playlistSchema)

module.exports = Playlists