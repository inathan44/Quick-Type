const { User, db, Score } = require('./server/db/index.cjs');

const seed = async () => {
  try {
    await db.sync({ force: true });
    await User.create({
      username: 'catcatcat',
      email: 'mother@gmail.com',
      password: '12345678910',
    });

    await Score.create({
      wpm: 86.34,
      testType: 'words',
      timeElapsed: '17.1',
      incorrectKeys: 5,
      language: 'english',
      accuracy: 0.98,
      raw: 95.22,
      userId: 1,
      totalKeysPressed: 154,
    });

    db.close();
  } catch (err) {
    console.error(err);
    console.log('Seeding failed');
  }
};
seed();
