"use strict";
const { CHARACTER_TABLE } = require("./../models/character.model");
const { USER_TABLE } = require("./../models/user.model");
const { MOVIE_TABLE } = require("./../models/movie.model");
const { GENRE_TABLE } = require("./../models/genre.model");
const { MOVIE_CHARACTER_TABLE } = require("./../models/movie-character.model")

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: true,
      },
      password: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      recoveryToken: {
        field: 'recovery_token',
        allowNull: true,
        type: Sequelize.DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'create_at',
        defaultValue: Sequelize.NOW
      }
    });

    await queryInterface.createTable(GENRE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      image: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: "created_at",
        defaultValue: Sequelize.NOW,
      }
    })

    await queryInterface.createTable(MOVIE_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      image: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      ratings: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      genreId: {
        field: "genre_id",
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: GENRE_TABLE,
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: "created_at",
        defaultValue: Sequelize.NOW,
      },
    })

    await queryInterface.createTable(CHARACTER_TABLE,{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        unique: false,
        allowNull: false,
      },
      image: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      age:{
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      weight: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false,
      },
      story: {
        type: Sequelize.DataTypes.TEXT,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      }
    })

    await queryInterface.createTable(MOVIE_CHARACTER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        field: "created_at",
        defaultValue: Sequelize.NOW,
      },
      movieId: {
        field: "movie_id",
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
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
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: CHARACTER_TABLE,
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      }
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(GENRE_TABLE);
    await queryInterface.dropTable(MOVIE_TABLE);
    await queryInterface.dropTable(CHARACTER_TABLE);
    await queryInterface.dropTable(MOVIE_CHARACTER_TABLE);
  },
};
