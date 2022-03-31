const { Character, CharacterSchema } = require("./character.model");
const { Movie, MovieSchema } = require("./movie.model");
const { Genre, GenreSchema } = require("./genre.model");
const { User, UserSchema } = require("./user.model");
const { MovieCharacter, MovieCharacterSchema } = require("./movie-character.model");

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Genre.init(GenreSchema, Genre.config(sequelize));
  Movie.init(MovieSchema, Movie.config(sequelize));
  Character.init(CharacterSchema, Character.config(sequelize));
  MovieCharacter.init(MovieCharacterSchema, MovieCharacter.config(sequelize));

  Genre.associate(sequelize.models);
  Movie.associate(sequelize.models);
  Character.associate(sequelize.models);
}

module.exports = setupModels;