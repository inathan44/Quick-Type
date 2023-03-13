const { User } = require('./db/index.cjs');

const requireTokenAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.status(403).send('User is not logged in');
    }
    const user = await User.findByToken(token);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

// const isAdmin = async (req, res, next) => {
//   try {
//     //
//   } catch (err) {
//     next(err);
//   }
//  };

module.exports = {
  requireTokenAuth,
  // isAdmin
};
