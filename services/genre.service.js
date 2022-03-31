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
    return await models.Genre.findByPk(id, {
      attributes: { exclude: ["createdAt"] },
    });
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
    await genre.destroy();
    return { id };
  }
}

module.exports = GenreService;
