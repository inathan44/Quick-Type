const { User } = require('./db/index.cjs');

const requireTokenAuth = async (req, res, next) => {
  try {
    console.log(req.locals.token);
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
