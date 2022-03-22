const express = require('express')
const app = express()
const bodyParser = require('body-parser')
require('dotenv').config()
const port = process.env.port
const mongoConnection = require('./connection/mongoConnection')
const userRouter = require('./routes/userRouter')
const songRouter = require('./routes/songRouter')

app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))
app.mongoConnection = mongoConnection

app.use('/api/users', userRouter)
app.use('/api/songs', songRouter)

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`)
})