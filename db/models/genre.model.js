const { Model, DataTypes, Sequelize } = require("sequelize");

const GENRE_TABLE = "genre";

const GenreSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: "created_at",
    defaultValue: Sequelize.NOW,
  },
};

class Genre extends Model {
  static associate(models) {
    this.hasMany(models.Film, {
      as: "film",
      foreignKey: "genreId",
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: GENRE_TABLE,
      modelName: "Genre",
      timestamps: false,
    };
  }
}

module.exports = { GENRE_TABLE, GenreSchema, Genre }
