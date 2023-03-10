const { User, Score, db } = require('./server/db/index.cjs');

const seed = async () => {
  try {
    await db.sync();
    await User.create({
      username: 'EasyName',
      email: 'mother@gmail.com',
      password: 'EasyName',
    });
    await Score.create({
      WPM: 10,
      type: 'english',
      time: 100,
      incorrectLetters: 0,
      lettersTyped: 100,
      userId: 1,
    });
    db.close();
  } catch (err) {
    console.error(err);
    console.log('Seeding failed');
  }
};
seed();
