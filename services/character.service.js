const { models } = require("../libs/sequelize");

class CharacterServices {

    async findAll(){
        return await models.Character.findAll({
            attributes: { exclude: ["createdAt"] },
            order: [["id", "ASC"]],
          });
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