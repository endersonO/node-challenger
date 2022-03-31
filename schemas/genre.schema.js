const Joi = require("joi");

const id = Joi.number().integer();
const name = Joi.string().min(3);
const image = Joi.string().uri();

const createGenreSchema = Joi.object({
  name: name.required(),
  image: image.required()
});

const updateGenreSchema = Joi.object({
  name: name,
  image: image
});

const getGenreSchema = Joi.object({
  id: id.required()
})

module.exports = { createGenreSchema, getGenreSchema, updateGenreSchema };
