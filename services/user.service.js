const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize')
const bcrypt = require('bcrypt')

class UserServices {
    async create(data){
        const hash = await bcrypt.hash(data.password, 10);

        const newData = {
            ...data,
            password: hash
        }

        const newUser = await models.User.create(newData);

        delete newUser.dataValues.password;
        delete newUser.dataValues.createdAt;
        delete newUser.dataValues.recoveryToken;
        return newUser;
    }
}

module.exports = UserServices;