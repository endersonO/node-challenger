const { models } = require("../libs/sequelize");

class CharacterServices {
    async create(data){
        const newCharacter = await models.Character.create(data);

        delete newCharacter.dataValues.createdAt;
        return newCharacter;
    }
}

module.exports = CharacterServices