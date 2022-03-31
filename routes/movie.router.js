const express = require("express");
const router = express.Router();
const passport = require("passport");

const validatorHandler = require("../middlewares/validator.handler");
const { createMovieSchema } = require('../schemas/movie.schema');

const MovieService = require("../services/movie.service");
const service = new MovieService();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    /* // #swagger.tags = ['movie']
    #swagger.description = "Get all movies"
    */
    try {
      res.status(200).json(await service.findAll());
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    /* // #swagger.tags = ['movie']
    #swagger.description = "Get movies by id"
    */
    try {
      const { id } = req.params;
      res.status(200).json(await service.findById(id));
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(createMovieSchema, 'body'),
  async (req, res, next) => {
    /* // #swagger.tags = ['movie']
    #swagger.description = "Create movie"
    #swagger.parameters['Movie information'] = {
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
      body.title = body.title.toLowerCase();
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;
