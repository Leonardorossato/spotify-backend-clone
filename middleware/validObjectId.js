const mongoose = require('mongoose')

const validObjectId = (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(404).json({message: 'Invalid id'})
    }
    next()
}

module.exports = validObjectId