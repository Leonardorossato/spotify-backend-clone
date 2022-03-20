const express = require('express')
const SongController = require('../controllers/songController')
const { authenticationTokenAdmin, authenticationTokenUser } = require('../middleware/authentication')
const validObjectId = require('../middleware/validObjectId')
const router = express.Router()

router.get('/', SongController.getAllSong)
router.get('/song/user/like/:id', authenticationTokenUser ,SongController.getAllLikedSongs)
router.post('/admin/song', authenticationTokenAdmin ,SongController.createSong)
router.put('/admin/song/:id', authenticationTokenAdmin, validObjectId, SongController.updateSong)
router.put('/song/user/liked/:id', validObjectId, authenticationTokenUser, SongController.LikedSongs)
router.delete('/admin/song/:id', authenticationTokenAdmin, validObjectId, SongController.deleteSong)

module.exports = router