const Sequelize = require('sequelize');
const dotenv = require('dotenv').config();
const Score = require('./models/Score.cjs')

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/quick-type`,
  {
    logging: false,
  }
);

module.exports = {
  db,
  Score
}
