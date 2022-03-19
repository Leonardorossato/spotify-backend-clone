const jwt = require('jsonwebtoken')
require('dotenv').config()
const process = process.env.process.privateKey

const authentication = (req,res, next) => {
    const token = req.headers("x-auth-token")
    if(!token) res.status(400).json({message: "Access Denied. No token provided."})

    jwt.verify(token, privateKey, (err, validateToken)=>{
        if(err) res.status(400).json({message: "Invalid token"})
        else requser = validateToken
        next()
    })
}