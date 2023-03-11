const Sequelize = require('sequelize');
const db = require('../database.cjs');

const Score = db.define('score', {
  wpm: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  testType: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  timeElapsed: {
    type: Sequelize.DECIMAL(10, 1),
    allowNull: false,
  },
  incorrectKeys: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  totalKeysPressed: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  language: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  accuracy: {
    type: Sequelize.DECIMAL(3, 2),
    allowNull: false,
  },
  raw: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
});
module.exports = Score;
