const Joi = require('joi');

const name = Joi.string().min(3);
const image = Joi.string().uri();
const age = Joi.number().integer().min(1);
const weight = Joi.number().integer().min(1);
const story = Joi.string().min(10);
const movies = Joi.array().items(Joi.number().integer());

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

module.exports = { createCharacterSchema, editCharacterSchema }