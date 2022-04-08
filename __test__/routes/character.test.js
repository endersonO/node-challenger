const { api, models } = require('./index')

beforeAll(async () => {
  await models.User.destroy({ where: {}, force: true });
  await models.Character.destroy({ where: {}, force: true });
  await models.Movie.destroy({ where: {}, force: true });
  await models.Genre.destroy({ where: {}, force: true });

  const genre = await models.Genre.create({
    name: "animadas",
    image: "https://placeimg.com/640/480/people",
  });
  await models.Movie.create({
    image: "https://placeimg.com/640/480/people",
    title: "animacion",
    ratings: 5,
    genreId: genre.dataValues.id,
  });
  const dataUser = {
    email: "test2@test.com",
    password: "passwordSuperSecurity123",
  };
  await api.post("/auth/register").send(dataUser);

});

describe("Character Test", () => {
  const dataUser = {
    email: "test2@test.com",
    password: "passwordSuperSecurity123",
  };
  const dataCharacter = {
    name: "Woody",
    image: "https://placeimg.com/640/480/people",
    age: 20,
    weight: 20,
    story:
      "Woody is Andy's toy, when andy doesn't see start amazing adventures",
  };
  let session;
  let characterId;

  test("Don't create Character", async () => {
    const res = await api.post("/characters").send(dataCharacter);

    expect(res.status).toBe(401);
  });

  test("need fields", async () => {
    await api.post("/auth/register").send(dataUser);

    session = await api.post("/auth/login").send(dataUser);

    const res = await api
      .post("/characters")
      .set("Authorization", "Bearer " + session.body.token)
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(
      '"name" is required. "image" is required. "age" is required. "weight" is required. "story" is required'
    );
  });

  test("Create Character", async () => {
    const res = await api
      .post("/characters")
      .set("Authorization", "Bearer " + session.body.token)
      .send(dataCharacter);

    expect(res.status).toBe(401);
    expect(res.body).toStrictEqual({
      id: expect.any(Number),
      name: dataCharacter.name,
      image: dataCharacter.image,
      age: dataCharacter.age,
      weight: dataCharacter.weight,
      story: dataCharacter.story,
    });
    characterId = res.body.id;
  });

  test("Get all Character", async () => {
    await api
      .post("/characters")
      .set("Authorization", "Bearer " + session.body.token)
      .send({
        name: "Buzz",
        image: "https://placeimg.com/640/480/people",
        age: 20,
        weight: 20,
        story:
          "Buzz is Andy's toy, when andy doesn't see start amazing adventures",
      });

    const res = await api
      .get("/characters")
      .set("Authorization", "Bearer " + session.body.token);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toStrictEqual({
      id: expect.any(Number),
      name: dataCharacter.name,
      image: dataCharacter.image,
      age: dataCharacter.age,
      weight: dataCharacter.weight,
      story: dataCharacter.story,
    });
  });

  test("Get Character By id", async () => {
    const res = await api
      .get("/characters/" + characterId.toString())
      .set("Authorization", "Bearer " + session.body.token);

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({
      id: characterId,
      name: dataCharacter.name,
      image: dataCharacter.image,
      age: dataCharacter.age,
      weight: dataCharacter.weight,
      story: dataCharacter.story,
    });
  });

  test("Edit Character", async () => {
    const res = await api
      .patch("/characters/" + characterId.toString())
      .set("Authorization", "Bearer " + session.body.token)
      .send({
        age: 16,
        weight: 10,
        story:
          "Woody is Andy's toy, when andy doesn't see start amazing adventures, when he figth with buzz",
      });

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({
      id: characterId,
      name: dataCharacter.name,
      image: dataCharacter.image,
      age: 16,
      weight: 10,
      story: "Woody is Andy's toy, when andy doesn't see start amazing adventures, when he figth with buzz",
    });
  });

  test("delete Character", async () => {
    const res = await api
      .delete("/characters/" + characterId.toString())
      .set("Authorization", "Bearer " + session.body.token);

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({
      id: characterId.toString()
    });
  });
});
