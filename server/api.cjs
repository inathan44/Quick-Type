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

// router.get('/', async (req, res, next) => {
//   res.cookie('token', 'hello');
//   res.json('hi');
// });

router.post('/login', async (req, res, next) => {
  try {
    // console.log(req);
    const { username, password } = req.body;
    // console.log(username, password);
    const token = await User.authenticate(username, password);
    // console.log(token);
    // if (token) {
    res.cookie('token', token);
    res.end();
    // res.end();
    // } else {
    //   err = new Error('Invalid username or password');
    //   err.status = 401;
    //   throw err;
    // }
  } catch (err) {
    err.status === 401 ? res.send(err) : next(err);
  }
});

router.use((req, res, next) => {
  const err = new Error('API ROUTE NOT FOUND');
  err.status = 404;
  next(err);
});

// router.post('/typingStats', (req, res, next) => {});

module.exports = router;
