const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const image = Joi.string().uri();
const age = Joi.number().integer().min(1);
const weight = Joi.number().integer().min(1);
const story = Joi.string().min(10);
const movies = Joi.array().items(Joi.number().integer());
const movieId = Joi.number().integer();

const createCharacterSchema = Joi.object({
    name: name.required(),
    image: image.required(),
    age: age.required(),
    weight: weight.required(),
    story: story.required(),
    movies: movies.required(),
})

const editCharacterSchema = Joi.object({
    name: name,
    image: image,
    age: age,
    weight: weight,
    story: story,
    movies: movies    
})

const idCharacterSchema = Joi.object({
    id: id.required()
})

const getCharacterSchema = Joi.object({
    name: name,
    movies: movieId,
    age: age,
    weight: weight,
    maxWeight: weight
})

module.exports = { getCharacterSchema, createCharacterSchema, editCharacterSchema, idCharacterSchema }