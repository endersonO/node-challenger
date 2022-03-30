const app = require("../../app");
const request = require("supertest");

const api = request(app);

const { models } = require("../../libs/sequelize");

module.exports = { api, models, request }