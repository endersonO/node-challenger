const { api, models } = require("./index");

let session;
const dataUser = {
  email: "test2@test.com",
  password: "passwordSuperSecurity123",
};

beforeAll(async () => {
  await models.User.destroy({ where: {}, force: true });
  await models.Genre.destroy({ where: {}, force: true });
  await api.post("/auth/register").send(dataUser);

  session = await api.post("/auth/login").send(dataUser);
});

describe("Genre test", () => {
  const data = {
    name: "animations",
    image: "https://placeimg.com/640/480/people",
  };

  test("Genre create, need token register", async () => {
    const res = await api.post("/genre").send(data);
    expect(res.statusCode).toBe(401);
  });

  test("Genre create, has token but no information", async () => {
    const res = await api
      .post("/genre")
      .set("Authorization", "Bearer " + session.body.token)
      .send({});

      expect(res.status).toBe(400);
      expect(res.body.message).toBe(
        '"name" is required. "image" is required'
      );
  });

  test("Genre create", async () => {
    const res = await api
      .post("/genre")
      .set("Authorization", "Bearer " + session.body.token)
      .send(data);

      expect(res.status).toBe(201);
      expect(res.body).toStrictEqual({
          id: expect.any(Number),
          image: data.image,
          name: data.name
      }
      );
  });
});
