const { Model, DataTypes, Sequelize } = require("sequelize");

const CHARACTER_TABLE = "character";

const CharacterSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    unique: false,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  age:{
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  story: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
};

class Character extends Model {
  static associate(models){
    this.belongsToMany(models.Movie,{
      as: "movies",
      through: models.MovieCharacter,
      foreignKey: "characterId",
      otherKey: "movieId"
    })
  }

  static config(sequelize){
    return {
      sequelize,
      tableName: CHARACTER_TABLE,
      modelName: 'Character',
      timestamps: false
    }
  }
}

module.exports = { Character, CharacterSchema, CHARACTER_TABLE }