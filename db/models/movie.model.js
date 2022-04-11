const { Model, DataTypes, Sequelize } = require("sequelize");
const { GENRE_TABLE } = require("./genre.model");

const MOVIE_TABLE = "movie";

const MovieSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  image: {
    type: DataTypes.STRING,
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
  createdDate:{
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_date"
  },
  movieSerie : {
    allowNull: false,
    type: DataTypes.STRING,
    field: "movie_serie"
  },
  genreId: {
    field: "genre_id",
    allowNull: false,
    type: DataTypes.INTEGER,
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

class Movie extends Model {
  static associate(models) {
    this.belongsToMany(models.Character, {
      as: "characters",
      through: models.MovieCharacter,
      foreignKey: "movieId",
      otherKey: "characterId",
    });

    this.belongsTo(models.Genre, { as: 'genre' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MOVIE_TABLE,
      modelName: "Movie",
      timestamps: false,
    };
  }
}

module.exports = { MOVIE_TABLE, MovieSchema, Movie };
