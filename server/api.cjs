const router = require('express').Router();
const { requireTokenAuth } = require('./authMIdWare.cjs');
const { User, Score } = require('./db/index.cjs');

router.post('/signup', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    res.send(newUser);
  } catch (err) {
    next(err);
  }
});

router.get('/auth', requireTokenAuth, async (req, res, next) => {
  res.send(req.user);
});

router.get('/topScores', async (req, res, nesxt) => {
  const top10 = await Score.getTopTen();
  // console.log(top10[0].user);
  // IDK HOW TO INCLUDE ONLY USER.username AND NOT THE WHOLE THING + IM TOO LAZY TO FIGURE OUT SO GOOD LUCK :3
  // BUT IF U WANT TO EDIT IT ITS IN MODEL SCORE
  res.json(top10);
});

router.get('/allScoresAmount', async (req, res, nesxt) => {
  const numberOfTests = await Score.numberOfTests();
  res.json(numberOfTests);
});

router.get('/verify/:token', async (req, res, next) => {
  const token = req.params.token;
  if (User.verifyToken(token)) {
    res.send(true);
  } else {
    res.send(false);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const token = await User.authenticate(username, password);
    if (token) {
      res.status(200).send(token);
    } else {
      err = new Error('Invalid username or password');
      err.status = 401;
      throw err;
    }
  } catch (err) {
    err.status === 401 ? res.send(err) : next(err);
  }
});
// Testing posting a score to the database
router.post('/score', async (req, res, next) => {
  try {
    const newScore = await Score.create(req.body);
    // console.log('newScore', newScore);
    res.send(newScore);
  } catch (err) {
    console.error(err);
    const error = new Error('Error posting score to the DB');
    next(error);
  }
});

router.use((req, res, next) => {
  const err = new Error('API ROUTE NOT FOUND');
  err.status = 404;
  next(err);
});

module.exports = router;
