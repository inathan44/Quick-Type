const db = require('./database.cjs');
const Score = require('./models/Score.cjs');
const User = require('./models/User.cjs');

// Associations

User.hasMany(Score);
Score.belongsTo(User);

db.sync();

module.exports = {
  db,
  Score,
  User,
};
