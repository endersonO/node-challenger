const { models } = require("../libs/sequelize");
const boom = require('@hapi/boom');

class MovieService {
  async findAll() {
    const allMovies = await models.Movie.findAll({
      attributes: { exclude: ["createdAt"] },
      order: [["id", "ASC"]],
    });

    return allMovies;
  }

  async findById(id) {
    const movie = await models.Movie.findByPk(id,{
      attributes: { exclude: ["createdAt"] }
    });
    if(!movie){
        throw boom.notFound('Movie not found');
      }

    return movie;
  }

  async create(data) {
    const newMovie = await models.Movie.create(data);

    delete newMovie.dataValues.createdAt;
    return newMovie;
  }

  async update(id, changes) {
    const movie = await models.Movie.findByPk(id);
    const editMovie = movie.update(changes);
  
    return editMovie;
  }

  async delete(id){
    const movie = await models.Movie.findByPk(id);
    movie.destroy()

    return id
  }
}

module.exports = MovieService;
