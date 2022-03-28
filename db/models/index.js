const { Character, CharacterSchema } = require("./character.model");
const { Film, FilmSchema } = require("./film.model");
const { Genre, GenreSchema } = require("./genre.model");
const { User, UserSchema } = require("./user.model");
const { FilmCharacter, FilmCharacterSchema } = require("./film-character.model");

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Genre.init(GenreSchema, Genre.config(sequelize));
  Film.init(FilmSchema, Film.config(sequelize));
  Character.init(CharacterSchema, Character.config(sequelize));
  FilmCharacter.init(FilmCharacterSchema, FilmCharacter.config(sequelize));

  Genre.associate(sequelize.models);
  Film.associate(sequelize.models);
  //Character.associate(sequelize.models);
}

module.exports = setupModels;