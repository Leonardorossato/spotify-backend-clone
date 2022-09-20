const Joi = require("joi");
const { validationPlaylist } = require("../middleware/validation");
const Playlists = require("../models/Playlist");
const Users = require("../models/Users");

class PlaylistController{
    static createPlaylist = async(req, res) => {

        try {
            const { error } = validationPlaylist(req.body);
            if (error) return res.status(400).send({message: error.details[0].message });

            const user = await Users.findById(req.user._id).lean();
            const playList = await Playlists({...req.body, user: user['_id']._id}).save()
            user.playlist.push(playList._id)

            await playList.save();
            return res.status(201).json(playList);
        } catch (error) {
            return res.status(404).json({error: error.message})
        }
    }
    
    static getAllPlaylists = async(req, res)=>{
        try {
           
            const playlists = await Playlists.find();
            return res.status(200).json({playlists});
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }

    static editPlaylistById = async(req, res)=>{
        const schema = Joi.object({
            name: Joi.string().required(),
            desc: Joi.string().allow(""),
            img: Joi.string().allow(""),
        });
        try {
            const { error } = schema.validate(req.body);
            if (error) return res.status(400).send({ message: error.details[0].message });

            const playlist = await Playlists.findById(req.params.id)
            if (!playlist) return res.status(404).send({ message: "Playlist not found" });

            const user = await Users.findById({user : user['_id']._id}).lean()
            if (!user._id.equals(playlist.user))
                return res.status(403).send({ message: "User don't have access to edit!" });

            playlist.name = req.body.name;
            playlist.desc = req.body.desc;
            playlist.img = req.body.img;
            await playlist.save();

            return res.status(200).json({ message: "Playlist updatedq successfully" });
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }
}

module.exports = PlaylistController