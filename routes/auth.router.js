const express = require("express");
const router = express.Router();

const validatorHandler = require("../middlewares/validator.handler");
const { createUserSchema } = require("../schemas/user.schema");
const UserServices = require('../services/user.service');
const userService = new UserServices();

router.post(
  "/register",
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    /* // #swagger.tags = ['Auth']
    #swagger.description = "Create a new user"
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
        res.status(201).json(await userService.create(body));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;