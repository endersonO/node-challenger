const app = require('../../app');
const request = require('supertest');

const api = request(app);
const url_base = '/auth/';

const { models } = require('../../libs/sequelize');

beforeAll(async () => {
  await models.User.destroy({ where: { }, force: true})
});

describe('user test', () => {
  const data = {
    "email": "test2@test.com",
    "password": "passwordSuperSecurity123"
  }
  test('Create New User', async () => {
    const res = await api
      .post(url_base + 'register')
      .send(data);

    expect(res.statusCode).toBe(201);
    expect(res.body).toStrictEqual({
      "email": data.email,
      "id": expect.any(Number)
    });
  })

  test('login user', async () => {
    const res = await api
      .post(url_base + 'login')
      .send(data);

    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual({
      "token": expect.any(String),
      "user" : {
        "email" : data.email,
        "id": expect.any(Number)
      }
    })
  })
});
