const passwordComplexity = require('joi-password-complexity')
const Joi = require('joi')

const validationUser = (user) =>{
    const schema = Joi.object({
        name: Joi.string().min(5).max(100).required(),
        email: Joi.string().email().min(3).max(200).required(),
        password: passwordComplexity().required(),
        month: Joi.string().required(),
        date: Joi.string().required(),
        year: Joi.string().required(),
        gender: Joi.string().valid("male", "female", "non-binary").required()
    })
    return schema.validate(user)
}

const validationSongs = (song) =>{
    const schema = Joi.object({
        name: Joi.string().required(),
        artist: Joi.string().required(),
        song: Joi.string().required(),
        img: Joi.string().required(),
        duration: Joi.string().required(),
    })
    return schema.validate(song)
}

const validationPlaylist = (playlist) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        users: Joi.string().required(),
        description: Joi.string().allow(""),
        songs: Joi.array().required(Joi.string()),
        img: Joi.string().allow(""),
    })
    return schema.validate(playlist)
}

module.exports = {validationUser, validationSongs, validationPlaylist}