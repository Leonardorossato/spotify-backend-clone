const mongoose = require('mongoose')
require('dotenv').config()
const mongoURI = process.env.mongoURI

mongoose.connect(mongoURI).then(() => {
    console.log('Connection with MongoDb was successfully.')
}).catch(err => {
    console.log('Error to connect to MongoDB!Try again later' +err)
})