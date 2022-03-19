const Users = require("../models/Users")
const bcrypt = require("bcrypt")

class AuthController{
    static loginUserCredentials = async(req, res)=>{
       const user = await Users.findOne({email: req.body.email})
       if(!user) return res.status(403).json({message: 'Invalid email address or password.'})

       const validPassword = await bcrypt.compare(req.body.password, user.password)
       if(!validPassword) return res.status(400).json({message: 'Invalid email or password.'})

       const token = user.gerenateAuthToken()
       return res.status(200).json({data : token, message: 'Signing please wait'})
    }
}

module.exports = AuthController