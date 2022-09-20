const express = require('express')
const SongController = require('../controllers/songController')
const { authenticationTokenAdmin, authenticationTokenUser } = require('../middleware/authentication')
const validObjectId = require('../middleware/validObjectId')
const router = express.Router()

router.get('/all', SongController.getAllSong)
router.post('/admin/create', authenticationTokenAdmin ,SongController.createSong)
router.put('/admin/song/:id', authenticationTokenAdmin, validObjectId, SongController.updateSong)
router.put('/like/song/:id', validObjectId,authenticationTokenUser,SongController.LikedSongs)
router.delete('/admin/song/:id', authenticationTokenAdmin, validObjectId, SongController.deleteSong)

module.exports = router