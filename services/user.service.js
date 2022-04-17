const { models } = require("../libs/sequelize");
const bcrypt = require("bcrypt");
const boom = require('@hapi/boom');
const { config } = require('../config/config')
const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(config.apiSendGrid)

class UserServices {
  async create(data) {
    const hash = await bcrypt.hash(data.password, 10);

    const newData = {
      ...data,
      password: hash,
    };
    const user = await this.findByEmail(newData.email);
    if(user) throw boom.badRequest('User exist');

    const newUser = await models.User.create(newData);

    delete newUser.dataValues.password;
    delete newUser.dataValues.createdAt;
    delete newUser.dataValues.recoveryToken;
    await this.sendCreateEmail(newUser);
    return newUser;
  }

  async findByEmail(email) {
    const user = await models.User.findOne({
      where: { email },
    });
    return user;
  }

  async sendCreateEmail(user){
    const msg = {
      to: user.email,
      from: config.emailSendGrid,
      subject: 'Welcome to Disney Library',
      text: 'Welcome to the Disney library, you will find information about the characters, movies or your favorite series',
      html: '<strong>Welcome to the Disney library, you will find information about the characters, movies or your favorite series</strong>'
    }

    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
      console.error(error)
      })
  }
}

module.exports = UserServices;
