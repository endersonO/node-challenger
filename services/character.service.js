const { models } = require("../libs/sequelize");
const { Op } = require("sequelize");

class CharacterServices {

    async findAll(query){
        if(query.age == undefined || query.age == '') query.age=0;
        if(query.movies == undefined || query.movies == '') query.movies=false;
        const characters = await models.Character.findAll({
            attributes: [
                'name',
                'image',
            ] ,
            order: [["id", "ASC"]],
            where: { 
                name: {
                    [Op.like]: '%' + query.name + '%' 
                },
                age: {
                    [Op.gte]: query.age
                }
            },
            include: query.movies ? [{
                model: models.Movie,
                as: 'movies',
                where:  {
                    id: query.movies
                },
                attributes: []
              }] : null
          });

        return characters;
    }

    async findById(id){
        return await models.Character.findByPk(id, {
            attributes: { exclude: ["createdAt"] },
            include: [{
                model: models.Movie,
                as: 'movies',
                attributes: { exclude: ["createdAt"] }
              }]
        });
    }

    async create(data){
        const movies = data.movies;
        delete data.movies;
        const newCharacter = await models.Character.create(data);

        //const id = newCharacter.dataValues.id
        await this.addMovie(movies, newCharacter.dataValues.id);
        delete newCharacter.dataValues.createdAt;
        return newCharacter;
    }

    async addMovie(movies, id){
        await models.MovieCharacter.create({
            movieId: movies[0],
            characterId: id
        })
    }

    async update(id, changes){
        const character = await models.Character.findByPk(id);

        if(!character){
            throw boom.notFound("Character not found");
        }

        const rta = await character.update(changes);
        delete rta.dataValues.createdAt;
        return rta;
    }

    async delete(id){
        const character = await models.Character.findByPk(id);

        if(!character){
            throw boom.notFound("Character not found");
        }

        await character.destroy();
        return { id };
    }
}

module.exports = CharacterServices