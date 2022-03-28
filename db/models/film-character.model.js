const { Model, DataTypes, Sequelize } = require("sequelize");

const { CHARACTER_TABLE } = require("./character.model");

const { FILM_TABLE } = require("./film.model");

const FILM_CHARACTER_TABLE = "film_character";

const FilmCharacterSchema = {
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
  filmId: {
    field: "film_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: FILM_TABLE,
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

class FilmCharacter extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: FILM_CHARACTER_TABLE,
      modelName: 'FilmCharacter',
      timestamps: false
    };
  }
}

module.exports = { FilmCharacter, FilmCharacterSchema, FILM_CHARACTER_TABLE }