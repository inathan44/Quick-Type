const Sequelize = require("sequelize")
const db = require('../database')

const Score = db.define('score', {
    WPM: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    time: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    incorrectLetters: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    lettersTyped: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
})
module.exports = Score