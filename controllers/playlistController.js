const Joi = require("joi");
const { validationPlaylist } = require("../middleware/validation");
const Playlists = require("../models/Playlist");
const Songs = require("../models/Songs");
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
    static editPlaylistById = async(req, res)=>{
        try {
            const schema = Joi.object({
                name: Joi.string().required(),
                description: Joi.string().allow(""),
                img: Joi.string().allow(''),
            })
            const {error} = schema.validate(req.body)
            if (error) return res.status(400).json({message: error.details[0].message})

            const playlist = await Playlists.findById(req.params.id)
            if (!playlist) return res.status(404).json({message: "Playlist not found"})

            const user = await Users.findById(req.user._id)
            if(!user._id.equals(playlist.user)) 
                return res.status(403).json({message: "User dont have access to edit this playlist"})
            
                playlist.name = req.body.name
            playlist.description = req.body.description
            playlist.img = req.body.img
            await playlist.save()
            return res.status(200).json({message: "Playlist updated successfully."})
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }
    static addSongToPlaylist = async(req, res) => {
        try {
            const schema = Joi.object({
                playlistId: Joi.string().required(),
                songId: Joi.string().required()
            })
            const {error} = schema.validate(req.body)
            if(error) return res.status(400).json({message: error.details[0].message})
    
            const user = await Users.findById(req.user._id)
            const playlist = await Playlists.findById(req.body.playlistId)
            if(!user._id.equals(playlist.user)) 
                return res.status(404).json({message: "User dont have access to add."})
            else if(playlist.songs.indexOf(req.body.songId) === -1)
                playlist.songs.push(req.body.songId)
            await playlist.save()
            return res.status(200).json({data : playlist, message: "Added to playlist."})
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }
    static removeSongFromPlaylist = async(req, res) => {
        try {
            const schema = Joi.object({
                playlistId: Joi.string().required(),
                songId: Joi.string().required()
            })
            const {error} = schema.validate(req.body)
            if(error) return res.status(400).json({message: error.details[0].message})

            const user = await Users.findById(req.user._id)
            const playlist = await Playlists.findById(req.body.playlistId)
            if(!user._id.equals(playlist.user)) 
                return res.status(404).json({message: "User dont have access to remove."})
            
            const index = playlist.songs.indexOf(req.body.songId)
            playlist.songs.splice(index, 1)
            await playlist.save()
            return res.status(200).json({data: playlist, message: "Removed from playlist."})
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }
    static userFavoritePlaylist = async(req, res) => {
        try {
            const user = await Users.findById(req.user._id)
            const playlist = await Playlists.findById({_id: user.playlist})
            return res.status(200).json({data: playlist})
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }
    static getRandomPlaylist = async(req, res) => {
        try {
            const playlist = await Playlists.aggregate([{$sample: {size: 10}}])
            return res.status(200).json({data: playlist})
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }
    static getPlaylistById = async(req, res) => {
        try {
            const playlist = await Playlists.findById(req.params.id)
            if(!playlist) return res.status(404).json({message: "Not found"})

            const songs = await Songs.find({_id: playlist.songs})
            return res.status(200).json({data: {playlists: songs}})
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }
    static getAllPlaylists = async(req, res) => {
        try {
            const playlist = await Playlists.find()
            return res.status(200).json({data: {playlists: playlist}})
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }
    static deletePlaylistById = async(req, res) => {
        const user = await Users.findById(req.user._id)
        const playlist = await Playlists.findById(req.params.id)
        if(!user._id.equals(playlist.user))
            return res.status(403).json({message:"User dont have access to deleted"})
        
        const index = Users.playlist.indexOf(req.params.id)
        user.playlist.splice(index, 1)
        await user.save()
        await playlist.save()
        return res.status(200).json({message: "Removed from library"})
    }
}
module.exports = PlaylistController;