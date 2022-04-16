const { models } = require("../libs/sequelize");
const boom = require('@hapi/boom');
const { Op } = require("sequelize");

class MovieService {
  async findAll(query) {
    if(query.title == undefined) query.title='';
    if(query.genre == undefined || query.genre == '') query.genre=false;
    if(query.order == undefined || query.order == '') query.order='ASC';
    if(query.order != 'ASC' && query.order != 'DESC') throw boom.badRequest('Not permit');

    const allMovies = await models.Movie.findAll({
      attributes: ['image', 'title', 'createdDate'],
      order: [["id", query.order ]],
      where: {
        title: {
          [Op.like]: '%' + query.title + '%'
        },
      },
      include: query.genre ? [{
        model: models.Genre,
        as: 'genre',
        attributes: [],
        where: {
          id: query.genre
        }
      }] : null 
    });

    return allMovies;
  }

  async findById(id) {
    const movie = await models.Movie.findByPk(id,{
      attributes: { exclude: ["createdAt"] },
      include: [{
        model: models.Genre,
        as: 'genre',
        attributes: { exclude: ["createdAt"] }
      },
      {
        model: models.Character,
        as: 'characters',
        attributes: { exclude: ["createdAt"] }
      }
    ]
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
