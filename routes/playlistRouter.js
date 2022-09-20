const express = require('express')
const PlaylistController = require('../controllers/playlistController')
const { authenticationTokenUser } = require('../middleware/authentication')
const validObjectId = require('../middleware/validObjectId')
const router = express.Router()

router.get('/all', authenticationTokenUser,PlaylistController.getAllPlaylists)
router.post('/create', authenticationTokenUser, PlaylistController.createPlaylist)
router.put('/edit/:id', validObjectId, authenticationTokenUser, PlaylistController.editPlaylistById)
router.put('/add/song', authenticationTokenUser, PlaylistController.addSongInPlaylist)
router.delete('/delete/:id', validObjectId, authenticationTokenUser, PlaylistController.deletePlaylistById)

module.exports = router