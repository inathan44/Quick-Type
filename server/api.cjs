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

// Testing posting a score to the database
router.post('/score', async (req, res, next) => {
  try {
    const newScore = await Score.create(req.body);
    console.log('newScore', newScore);
    res.send(newScore);
  } catch (err) {
    console.err(err);
    const error = new Error('Error posting score to the DB');
    next(error);
  }
});

router.use((req, res, next) => {
  const err = new Error('API ROUTE NOT FOUND');
  err.status = 404;
  next(err);
});

// router.post('/typingStats', (req, res, next) => {});

module.exports = router;
