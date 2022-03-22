const { validationPlaylist } = require("../middleware/validation");
const Playlists = require("../models/Playlist");
const Users = require("../models/Users");

class PlaylistController {
    static createPlaylist = async(req, res) => {
        try {
            const {error} = validationPlaylist(req.body)
            if(error) return res.status(400).json({message: error.details[0].message})

            const user = await Users.findById(req.user._id)
            const playlist = await Playlists({...req.body, user, user: user._id}).save()
            user.playlists.push(playlist._id)
            await user.save()
            return res.status(201).json({data: playlist})
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }
}
module.exports = PlaylistController;