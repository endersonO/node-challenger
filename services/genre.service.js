const { models } = require("../libs/sequelize");
class GenreService {
  async create(data) {
    const newGenre = await models.Genre.create(data);
    
    delete newGenre.dataValues.createdAt;
    return newGenre;
  }
}

module.exports = GenreService;
