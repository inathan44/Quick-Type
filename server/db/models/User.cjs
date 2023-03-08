const Sequelize = require('sequelize');
const db = require('../database.cjs');

const User = db.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    // Usernames between 6 - 16 characters only letters
    validate: {
      len: [6, 16],
      isAlpha: true,
    },
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
      notEmpty: true,
      notNull: true,
    },
  },
  // Passwords are not yet hashed, do not put in sensitive info
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    validate: {
      notEmpty: true,
      notNull: true,
    },
  },
});

module.exports = User;
