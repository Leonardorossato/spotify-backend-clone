const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
const PORT = process.env.PORT
const mongoConnection = require('./connection/mongoConnection')
const userRouter = require('../routes/userRouter')
const songRouter = require('../routes/songRouter')
const playlistRouter = require('../routes/playlistRouter')

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.mongoConnection = mongoConnection

app.use('/api/users', userRouter)
app.use('/api/songs', songRouter)
app.use('/api/playlists', playlistRouter)


app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`)
})