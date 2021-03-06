const express = require("express");
const authRouter = require('./auth.router')
const characterRouter = require('./character.router')
const genreRouter = require('./genre.router')
const movieRouter = require('./movie.router')

function routerApi(app) {
  const router = express.Router();
  
  app.use(router);
  router.use('/auth', authRouter);
  router.use('/characters', characterRouter);
  router.use('/genre', genreRouter);
  router.use('/movies', movieRouter);
}

module.exports = routerApi;
