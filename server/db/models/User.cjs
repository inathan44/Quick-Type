const Sequelize = require('sequelize');
const dotenv = require('dotenv').config();
const db = require('../database.cjs');
const Score = require('./Score.cjs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
// Checkpassword
User.prototype.checkPassword = async function (potentialPassword) {
  return await bcrypt.compare(potentialPassword, this.password);
};

User.prototype.createToken = async function (user) {
  try {
    return await jwt.sign({ id: user.id }, process.env.JWT);
  } catch (err) {
    console.log('User.id is not valid');
    return 'User.id is not valid';
  }
};
User.findByToken = async function (token) {
  try {
    const { id } = await jwt.verify(token, process.env.JWT);
    const user = User.findByPk(id);
    return user;
  } catch (err) {
    const error = Error('bad token');
    error.status = 401;
    throw error;
  }
};

User.authenticate = async function (username, password) {
  try {
    const user = await User.findOne({
      where: { username: username },
      // FUTURE PROOF TO INCLUDE SCORES IN LIST
      // include: {
      //   model: Score,
      // },
    });
    console.log(user);
    if (user && (await bcrypt.compare(password, this.password))) {
      return jwt.sign(
        {
          id: user.id,
          isAdmin: user.isAdmin,
          // FUTURE PROOF
          // score: user.score,
        },
        process.env.JWT
      );
    } else {
      const error = new Error('invalid password');
      error.status = 401;
      throw error;
    }
  } catch (err) {
    console.log('authentication failed', err);
  }
};
User.isAdmin = async function (token) {
  try {
    const user = await jwt.verify(token, process.env.JWT);
    return user.isAdmin;
  } catch (err) {
    const error = Error('bad token');
    error.status = 401;
    throw error;
  }
};
//HASHES PASSWORD ON CREATION
User.beforeCreate(async function (user) {
  user.password = await bcrypt.hash(
    user.password,
    Number(process.env.SALT_ROUNDS)
  );
});

module.exports = User;
