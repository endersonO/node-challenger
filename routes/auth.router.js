const express = require("express");
const router = express.Router();
const passport = require('passport');

const validatorHandler = require("../middlewares/validator.handler");
const { createUserSchema } = require("../schemas/user.schema");
const UserServices = require('../services/user.service');
const userService = new UserServices();
const AuthServices = require('../services/auth.service');
const service = new AuthServices();

router.post(
  "/register",
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
        const body = req.body;
        res.status(201).json(await userService.create(body));
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/login",
  passport.authenticate('local', {session: false}),
  async (req, res, next) => {
    try {
        const user = req.user;
        res.status(200).json(service.signToken(user));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;