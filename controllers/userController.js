const Users = require('../models/Users')

class UserController{

    static getUsersById  = async(req, res) => {
        try {
            const user = await Users.findById(req.params.id).select("-password-__v")
            return res.status(200).json(user)
        } catch (error) {
            return res.status(200).json({error: error.message})
        }
    }

    static getAllUsers = async(req, res)=>{
        try {
            const user = await Users.find().select("-password -__v")
            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }

    static deleteUser = async(req, res) => {
        try {
            await Users.findByIdAndDelete(req.params.id)
            return res.status(200).json({message: 'User successfully deleted'})
        } catch (error) {
            return res.status(500).json({error: error.message})
        }
    }
}

module.exports = UserController