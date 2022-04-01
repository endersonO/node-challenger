const { api, models } = require("./index");

let session;
const dataUser = {
  email: "test2@test.com",
  password: "passwordSuperSecurity123",
};

let genre;
const dataGenre = {
  name: "animations",
  image: "https://placeimg.com/640/480/people",
};

let movieId;
beforeAll(async () => {
  await models.User.destroy({ where: {}, force: true });
  await models.Movie.destroy({ where: {}, force: true });
  await models.Genre.destroy({ where: {}, force: true });

  await api.post("/auth/register").send(dataUser);

  session = await api.post("/auth/login").send(dataUser);
});

describe("Movie test", () => {
  /* console.log("data genre", genre); */
  const dataMovie = {
    title: "Toy story",
    image: "https://placeimg.com/640/480/people",
    ratings: 4,
    /* genreId: genre.body.id, */
  };

  test("don't Create Movie, need token", async () => {
    const rta = await api.post("/movies").send(dataMovie);

    expect(rta.statusCode).toBe(401);
  });

  test("don't Create Movie, need information", async () => {
    const res = await api
      .post("/movies")
      .set("Authorization", "Bearer " + session.body.token)
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(
      '"title" is required. "image" is required. "ratings" is required. "genreId" is required'
    );
  });

  test("Create Movie", async () => {
    genre = await api
      .post("/genre")
      .set("Authorization", "Bearer " + session.body.token)
      .send(dataGenre);

    dataMovie.genreId = genre.body.id;

    const res = await api
      .post("/movies")
      .set("Authorization", "Bearer " + session.body.token)
      .send(dataMovie);

    expect(res.status).toBe(201);
    expect(res.body).toStrictEqual({
      id: expect.any(Number),
      title: dataMovie.title.toLowerCase(),
      image: dataMovie.image,
      ratings: dataMovie.ratings,
      genreId: dataMovie.genreId,
    });
    movieId = res.body.id;

    const res2 = await api
      .post("/movies")
      .set("Authorization", "Bearer " + session.body.token)
      .send({
        title: "Mulan",
        image: "https://placeimg.com/640/640/people",
        ratings: 4,
        genreId: genre.body.id
      });

    expect(res2.status).toBe(201);
  });

  test("Get All Movies", async () => {
    const res = await api
      .get("/movies")
      .set("Authorization", "Bearer " + session.body.token);

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toStrictEqual({
      id: expect.any(Number),
      title: dataMovie.title.toLowerCase(),
      image: dataMovie.image,
      ratings: dataMovie.ratings,
      genreId: dataMovie.genreId,
    });
  });

  test("Get movie by Id", async () => {
    const res = await api
      .get("/movies/" + movieId.toString())
      .set("Authorization", "Bearer " + session.body.token);

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({
      id: expect.any(Number),
      title: dataMovie.title.toLowerCase(),
      image: dataMovie.image,
      ratings: dataMovie.ratings,
      genreId: dataMovie.genreId,
    });
  });

  test("Edit movie Id", async () => {
    const res = await api
      .patch("/movies/" + movieId.toString())
      .set("Authorization", "Bearer " + session.body.token)
      .send({
        ratings: 5
      });
      
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({
      id: expect.any(Number),
      title: dataMovie.title.toLowerCase(),
      image: dataMovie.image,
      ratings: 5,
      genreId: dataMovie.genreId,
    });
  });

  test("Delete movie by Id", async () => {
    const res = await api
      .delete("/movies/" + movieId.toString())
      .set("Authorization", "Bearer " + session.body.token);
      
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({
      id: movieId.toString()
    });
  });
});
