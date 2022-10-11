const Joi = require("joi");
const { validationPlaylist } = require("../middleware/validation");
const Playlists = require("../models/Playlist");
const Users = require("../models/Users");
class PlaylistController{
    static createPlaylist = async(req, res) => {

        try {
            const { error } = validationPlaylist(req.body);
            if (error) {
                return res.status(400).send({message: error.details[0].message });
            }
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
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                desc: Joi.string().allow(""),
                img: Joi.string().allow(""),
            }); 
            const { error } = schema.validate(req.body);
            if (error) return res.status(400).send({ message: error.details[0].message });

            const playlist = await Playlists.findById(req.params.id)
            if (!playlist) return res.status(404).send({ message: "Playlist not found" });

            const user = await Users.findById({_id: req.user._id}).lean()
            if (!user._id.equals(playlist.user)){
                return res.status(403).send({ message: "User don't have access to edit!" });
            }

            playlist.name = req.body.name;
            playlist.desc = req.body.desc;
            playlist.img = req.body.img;
            await playlist.save().then(()=>{
                return res.status(200).json(playlist);
            })
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }

    static addSongInPlaylist =async(req, res) =>{
        try {

            const schema = Joi.object({
                playlistId: Joi.string().required(),
                songId: Joi.string().required(),
            });
            const { error } = schema.validate(req.body);
            if (error) return res.status(400).send({ message: error.details[0].message });
            
            const user = await Users.findById(req.user._id).lean();
            const playlist = await Playlists.findById(req.body.playlistId)
            if (!user._id.equals(playlist.user)){
                return res.status(403).send({ message: "User don't have access to add!" });
            }
            if(playlist.songs.indexOf(req.body.songId) === -1) {
                playlist.songs.push(req.body.songId);
            }
            await playlist.save();
            return res.status(200).json({ data: playlist, message: "Added to playlist" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static deletePlaylistById = async(req, res)=>{
        try {
           
            const user = await Users.findById(req.user._id)
            const playlist = await Playlists.findById(req.params.id)
            if (!user._id.equals(playlist.user)){
                return res.status(403).json({ message: "User don't have access to delete!" });
            }
            const index = user.playlist.indexOf(req.params.id)
            user.playlist.splice(index, 1);

            await user.save();
            await playlist.remove();
            return res.status(200).json({ message: "Playlist remove from library" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    static searchPartitionPlaylist = async(req, res) => {
        try {
            let {page, limit, sort, asc} = req.query
            if(!page){
                page = 1
            }
            if(!limit){
                limit = 10
            }
            let skip = (page - 1) * 10
            const playList = await Playlists.find().sort({[sort]:-1}).skip(skip).limit(limit)
            return res.status(200).json({playList:playList ,page:page+1, limit:limit})
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }
}

module.exports = PlaylistController