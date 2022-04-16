const { models } = require("../libs/sequelize");
const boom = require('@hapi/boom');

class GenreService {
  async findAll() {
    const allGenre = await models.Genre.findAll({
      attributes: { exclude: ["createdAt"] },
      order: [["id", "DESC"]],
    });
    return allGenre;
  }

  async findById(id) {
    const genre = await models.Genre.findByPk(id, {
      attributes: { exclude: ["createdAt"] },
      include: [{
        model: models.Movie,
        as: 'movies',
        attributes: { exclude: ["createdAt"] }
      }]
    });
    if (!genre) {
      throw boom.notFound("Genre not found");
    }
    return genre
  }

  async create(data) {
    const newGenre = await models.Genre.create(data);

    delete newGenre.dataValues.createdAt;
    return newGenre;
  }

  async update(id, changes) {
    const genre = await models.Genre.findByPk(id);
    if (!genre) {
      throw boom.notFound("Genre not found");
    }
    const rta = await genre.update(changes);
    delete rta.dataValues.createdAt;
    return rta;
  }

  async delete(id) {
    const genre = await models.Genre.findByPk(id);
    if(!genre) throw boom.notFound("Genre not found");
    await genre.destroy();
    return { id };
  }
}

module.exports = GenreService;
