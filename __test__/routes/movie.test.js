const { api, models } = require("./index");

let session;
const dataUser = {
  email: "test2@test.com",
  password: "passwordSuperSecurity123",
};

beforeAll(async () => {
  await models.User.destroy({ where: {}, force: true });

  await api.post("/auth/register").send(dataUser);

  session = await api.post("/auth/login").send(dataUser);
});

/* describe('Movie test', () => { second }) */
