const Sequelize = require("sequelize");
const db = require("./database");

const Game = db.define("game", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 1,
      max: 5,
    },
  },
});

module.exports = Game;
