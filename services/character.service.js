const { models } = require("../libs/sequelize");
const { Op } = require("sequelize");
const boom = require('@hapi/boom');

class CharacterServices {

    async findAll(query){
        if(query.age == undefined || query.age == '') query.age=0;
        if(query.movies == undefined || query.movies == '') query.movies=false;
        if(query.name == undefined) query.name='';

        let minWeight, maxWeight;
        if(query.weight == undefined || query.weight == ''){ 
            minWeight=0;
            maxWeight=1000;
        } else {
            if(query.maxWeight == undefined || query.maxWeight == ''){
                minWeight = parseInt(query.weight) - 5;
                maxWeight = parseInt(query.weight) + 5;
            } else {
                minWeight = query.weight;
                maxWeight = query.maxWeight
            }
        }

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
                },
                weight: {
                    [Op.between]: [minWeight, maxWeight]
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
        const movies = changes.movies;
        delete changes.movies;
        const character = await models.Character.findByPk(id);

        if(!character){
            throw boom.notFound("Character not found");
        }

        await character.update(changes);
        if(movies!= undefined && movies.length != 0)
            await this.addMovie(movies, id);
        return await this.findById(id);
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