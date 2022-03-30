const express = require("express");
const passport = require("passport");
const router = express.Router();

const validatorHandler = require('./../middlewares/validator.handler');
const { createCharacterSchema } = require('../schemas/character.schema');

const CharacterServices = require('../services/character.service');
const service = new CharacterServices();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(createCharacterSchema, 'body'),
  async (req, res, next) => {
    /* // #swagger.tags = ['Character']
    #swagger.description = "Create a new character"
    #swagger.parameters['Access Information'] = {
        in: 'body',
        description: 'this required email and password',
        '@schema': {
          "required": ["User"],
          "properties": {
            "email": {
              "type": "string",
              "example": "example@mail.com"
            },
            "password":  {
                "type": "string",
                "example": "ax12XSA&ads"
            },
          }
        }
      }
    */
    try {
      const body = req.body;
      body.name = body.name.toLowerCase();
      body.story = body.story.toLowerCase();

      res.status(401).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
