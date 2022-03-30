const Joi = require('joi');

const name = Joi.string().min(3);
const image = Joi.string().uri();
const age = Joi.number().integer().min(1);
const weight = Joi.number().integer().min(1);
const story = Joi.string().min(10);

const createCharacterSchema = Joi.object({
    name: name.required(),
    image: image.required(),
    age: age.required(),
    weight: weight.required(),
    story: story.required()
})

module.exports = { createCharacterSchema }