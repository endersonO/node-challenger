const express = require("express");
const router = express.Router();
const passport = require("passport");

const validatorHandler = require("../middlewares/validator.handler");
const { createGenreSchema } = require("../schemas/genre.schema");

const GenreService = require("../services/genre.service");
const service = new GenreService();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(createGenreSchema, "body"),
  async (req, res, next) => {
    /* // #swagger.tags = ['Genre']
    #swagger.description = "Create a new user"
    #swagger.parameters['Access Information'] = {
        in: 'body',
        description: 'this required email and password',
        '@schema': {
          "required": ["User"],
          "properties": {
            "name": {
              "type": "string",
              "example": "animation"
            },
            "image":  {
                "type": "string",
                "example": "https://placeimg.com/640/480/people"
            },
          }
        }
      }
    */
    try {
      const body = req.body;
      body.name = body.name.toLowerCase();
      
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
