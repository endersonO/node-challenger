const { api, models } = require('./index')
let movieId

beforeAll(async () => {
  await models.MovieCharacter.destroy({ where: {}, force: true });
  await models.Character.destroy({ where: {}, force: true });
  await models.Movie.destroy({ where: {}, force: true });
  await models.Genre.destroy({ where: {}, force: true });
  await models.User.destroy({ where: {}, force: true });

  const genre = await models.Genre.create({
    name: "animadas",
    image: "https://placeimg.com/640/480/people",
  });
  const movie = await models.Movie.create({
    image: "https://placeimg.com/640/480/people",
    title: "Toy Story",
    ratings: 5,
    genreId: genre.dataValues.id,
    movieSerie: "movie",
    createdDate: "10-1-2022"
  });
  movieId = movie.id
  console.log("movie data", movie)
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
      "Woody is Andy's toy, when andy doesn't see start amazing adventures"
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
      '"name" is required. "image" is required. "age" is required. "weight" is required. "story" is required. "movies" is required'
    );
  });

  test("Create Character", async () => {
    dataCharacter.movies = [movieId]
    const res = await api
      .post("/characters")
      .set("Authorization", "Bearer " + session.body.token)
      .send(dataCharacter);

    console.log(res)
    expect(res.status).toBe(201);
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
        movies: [movieId]
      });

    const res = await api
      .get("/characters")
      .set("Authorization", "Bearer " + session.body.token);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toStrictEqual({
      name: dataCharacter.name,
      image: dataCharacter.image
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
      movies: expect.any(Object)
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
      movies: expect.any(Object)
    });
  });

  test("delete Character", async () => {
    const res = await api
      .delete("/characters/" + characterId.toString())
      .set("Authorization", "Bearer " + session.body.token);
      
    console.log("delete response", res)
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({
      id: characterId.toString()
    });
  });
});
