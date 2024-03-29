const passwordComplexity = require('joi-password-complexity')
const Joi = require('joi')

const validationUser = (user) =>{
    const schema = Joi.object({
        name: Joi.string().min(5).max(100).required(),
        email: Joi.string().email().min(3).max(200).required(),
        password: passwordComplexity().required(),
        birth_date: Joi.string().required(),
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

const validationPlaylist = (playList) => {
	const schema = Joi.object({
		name: Joi.string().required(),
		user: Joi.string().required(),
		desc: Joi.string().allow(""),
		songs: Joi.array().items(Joi.string()),
		img: Joi.string().allow(""),
	});
	return schema.validate(playList);
};

module.exports = {validationUser, validationSongs, validationPlaylist}