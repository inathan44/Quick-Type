const router = require('express').Router();
const { User, Score } = require('./db/index.cjs');

router.post('/signup', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.send(newUser);
  } catch (err) {
    next(err);
  }
});

router.use((req, res, next) => {
  const err = new Error('API ROUTE NOT FOUND');
  err.status = 404;
  next(err);
});

// router.post('/typingStats', (req, res, next) => {});

module.exports = router;
