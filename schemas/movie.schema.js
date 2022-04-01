const Joi = require('joi');

const image = Joi.string().uri();
const title = Joi.string();
const ratings = Joi.number().integer().min(0).max(5);
const genreId = Joi.number().integer();

const createMovieSchema = Joi.object({
    title: title.required(),
    image: image.required(),
    ratings: ratings.required(),
    genreId: genreId.required(),
})

const updateMovieSchema = Joi.object({
    title: title,
    image: image,
    ratings: ratings,
    genreId: genreId,
})

module.exports = { createMovieSchema, updateMovieSchema }