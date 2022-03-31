const { Model, DataTypes, Sequelize } = require("sequelize");

const { CHARACTER_TABLE } = require("./character.model");

const { MOVIE_TABLE } = require("./movie.model");

const MOVIE_CHARACTER_TABLE = "movie_character";

const MovieCharacterSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: Sequelize.NOW,
  },
  movieId: {
    field: "movie_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: MOVIE_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  characterId: {
    field: "character_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CHARACTER_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
};

class MovieCharacter extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: MOVIE_CHARACTER_TABLE,
      modelName: 'MovieCharacter',
      timestamps: false
    };
  }
}

module.exports = { MovieCharacter, MovieCharacterSchema, MOVIE_CHARACTER_TABLE }