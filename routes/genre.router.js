const express = require("express");
const router = express.Router();
const passport = require("passport");

const validatorHandler = require("../middlewares/validator.handler");
const {
  createGenreSchema,
  getGenreSchema,
  updateGenreSchema
} = require("../schemas/genre.schema");

const GenreService = require("../services/genre.service");
const service = new GenreService();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    /* // #swagger.tags = ['Genre']
    #swagger.description = "Get all genre"
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
  validatorHandler(getGenreSchema, "params"),
  async (req, res, next) => {
    /* // #swagger.tags = ['Genre']
    #swagger.description = "Get genre by id"
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

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(updateGenreSchema, "body"),
  validatorHandler(getGenreSchema, "params"),
  async (req, res, next) => {
    /* // #swagger.tags = ['Genre']
    #swagger.description = "update fields of genre"
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
      const { id } = req.params;
      const body = req.body;

      res.status(200).json(await service.update(id, body))
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(getGenreSchema, "params"),
  async (req, res, next) => {
    /* // #swagger.tags = ['Genre']
    #swagger.description = "Delete genre field"*/
      try {
        const { id } = req.params;
  
        res.status(200).json(await service.delete(id))
      } catch (error) {
        next(error);
      }
  }
);

module.exports = router;
