const Joi = require("joi");
const name = Joi.string().min(3);
const image = Joi.string().uri();

const createGenreSchema = Joi.object({
  name: name.required(),
  image: image.required()
});

module.exports = { createGenreSchema };
