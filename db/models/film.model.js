const { Model, DataTypes, Sequelize } = require("sequelize");
const { GENRE_TABLE } = require("./genre.model");

const FILM_TABLE = "film";

const FilmSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  image: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ratings: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  genreId: {
    field: "genre_id",
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: GENRE_TABLE,
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "SET NULL",
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: Sequelize.NOW,
  },
};

class Film extends Model {
  static associate(models) {
    this.belongsToMany(models.Character, {
      as: "characters",
      through: models.FilmCharacter,
      foreignKey: "filmId",
      otherKey: "characterId",
    });

    this.belongsTo(models.Genre, { as: 'genre' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: FILM_TABLE,
      modelName: "Film",
      timestamps: false,
    };
  }
}

module.exports = { FILM_TABLE, FilmSchema, Film };
