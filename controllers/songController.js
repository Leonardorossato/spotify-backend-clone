const { validationSongs } = require("../middleware/validation")
const Songs = require("../models/Songs")
const Users = require('../models/Users')

class SongController{
    static createSong = async(req, res) => {
        try {
            const {error} = validationSongs(req.body)
            if(error) return res.status(400).json({message: error.details[0].message})

            const song = await Songs(req.body).save()
            return res.status(201).json({data: song, message:"Song created successfully."})
        } catch (error) {
            return res.status(404).json({error: error.message})
        }
    }

    static getAllSong = async(req, res) => {
        try {
            const songs = await Songs.find()
            return res.status(200).json(songs)
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }

    static updateSong = async(req, res) => {
        try {
            const song = await Songs.findByIdAndUpdate(req.params.id, req.body,{new: true})
            return res.status(200).json({data: song, message:"Song updated successfully."})
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }

    static deleteSong = async(req, res) => {
        try {
            const song = await Songs.findByIdAndDelete(req.params.id)
            return res.status(200).json({data: song, message: "Song deleted successfully."})
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }

    static LikedSongs = async(req, res) => {
        try {
            let resMessage = ""
            const song = await Songs.findById(req.params.id)
            if(!song) res.status(400).json({message: "Song dosent not exists."})

            const user = await Users.findById(req.user._id)
            const index = user.likedSongs.indexOf(song._id)
            console.log(index)

            if(index === -1) {
                user.likedSongs.push(song._id) 
                resMessage ="Added to your liked songs."
            }else{
                user.likedSongs.splice(index,1)
                resMessage: "Removed from your liked songs."
            }
            await user.save()
            return res.status(200).json({message: resMessage})
        } catch (error) {
            return res.status(500).json({message: error.message})
        }
    }

    static getAllLikedSongs = async (req, res) => {
        try {
            const user = await Users.findById(req.user._id)
            const songs = await Songs.find({id : user.likedSongs})
            return res.status(200).json(songs)
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }
}

module.exports = SongController