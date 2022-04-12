const express = require("express");
const passport = require("passport");
const router = express.Router();

const validatorHandler = require('./../middlewares/validator.handler');
const { createCharacterSchema, editCharacterSchema } = require('../schemas/character.schema');

const CharacterServices = require('../services/character.service');
const service = new CharacterServices();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    /* // #swagger.tags = ['Character']
    #swagger.description = "Get all characters"
    */
    try {
      res.status(200).json(await service.findAll(req.query));
    } catch (error) {
      next(error);
    }
  }
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    /* // #swagger.tags = ['Character']
    #swagger.description = "Get character By Id"
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
  validatorHandler(createCharacterSchema, 'body'),
  async (req, res, next) => {
    /* // #swagger.tags = ['Character']
    #swagger.description = "Create a new character"
    #swagger.parameters['Access Information'] = {
        in: 'body',
        description: 'this required character data',
        '@schema': {
          "required": ["User"],
          "properties": {
            "name": {
              "type": "string",
              "example": "woody"
            },
            "image":  {
                "type": "string",
                "example": "https://placeimg.com/640/480/people"
            },
            "age": {
              "type": "number",
              "example": "10"
            },
            "weight":  {
              "type": "number",
              "example": "10"
            },
            "story":  {
              "type": "string",
              "example": "Woody is Andy's toy, when andy doesn't see start amazing adventures"
            },
          }
        }
      }
    */
    try {
      const body = req.body;

      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  validatorHandler(editCharacterSchema, 'body'),
  async (req, res, next) => {
    /* // #swagger.tags = ['Character']
    #swagger.description = "edit character"
    #swagger.parameters['Access Information'] = {
        in: 'body',
        description: 'this required character data',
        '@schema': {
          "required": ["User"],
          "properties": {
            "name": {
              "type": "string",
              "example": "woody"
            },
            "image":  {
                "type": "string",
                "example": "https://placeimg.com/640/480/people"
            },
            "age": {
              "type": "number",
              "example": "10"
            },
            "weight":  {
              "type": "number",
              "example": "10"
            },
            "story":  {
              "type": "string",
              "example": "Woody is Andy's toy, when andy doesn't see start amazing adventures"
            },
          }
        }
      }
    */
    try {
      const body = req.body;
      const { id } = req.params;

      res.status(200).json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res, next) => {
    /* // #swagger.tags = ['Character']
    #swagger.description = "Delete character"
    */
    try {
      const { id } = req.params;

      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
