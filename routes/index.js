const express = require("express");
const authRouter = require('./auth.router')
const characterRouter = require('./character.router')

function routerApi(app) {
  const router = express.Router();
  
  app.use(router);
  router.use('/auth', authRouter);
  router.use('/characters', characterRouter);
}

module.exports = routerApi;
