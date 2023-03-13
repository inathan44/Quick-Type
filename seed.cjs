// const db = require('./server/db/database.cjs');
'use strict';
const { User, Score, db } = require('./server/db/index.cjs');

const Users = [
  {
    username: 'EasyName',
    email: 'EasyName@gmail.com',
    password: 'EasyName',
  },
  {
    username: 'MidTierIan',
    email: 'AlwaysMidTier@midTier.com',
    password: 'AndrewDaBest',
  },
  {
    username: 'GrettaThunberg',
    email: 'randomAccount@gmail.com',
    password: 'OwOUwUOwO',
  },
];
const Scores = [
  {
    wpm: 93.23,
    testType: 'time',
    timeElapsed: 100.0,
    incorrectKeys: 0,
    totalKeysPressed: 100,
    language: 'english',
    accuracy: 1.0,
    raw: 123.3,
    userId: 1,
  },
  {
    wpm: 93.23,
    testType: 'time',
    timeElapsed: 100.0,
    incorrectKeys: 0,
    totalKeysPressed: 100,
    language: 'english',
    accuracy: 1.0,
    raw: 123.3,
    userId: 1,
  },
];

const seed = async () => {
  try {
    await db.sync({ force: true });
    console.log('seeeeeeding the Database <><><>><><><><><><><><><>');

    await Promise.all(
      Users.map((user) => {
        return User.create(user);
      })
    );
    await Promise.all(
      Scores.map((score) => {
        // console.log('<><><><><><><>', score);
        return Score.create(score);
      })
    );

    db.close();
  } catch (err) {
    console.error(err);
    console.log('Seeding failed');
    db.close();
  }
};
seed();
