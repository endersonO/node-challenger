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
      try {
        const { id } = req.params;
  
        res.status(200).json(await service.delete(id))
      } catch (error) {
        next(error);
      }
  }
);

module.exports = router;
