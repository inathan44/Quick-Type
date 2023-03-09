const {User, db} = require('./server/db/index.cjs')

const seed = async () => {
  try {
    await db.sync();
    await User.create({
          username: 'catcatcat',
          email: 'mother@gmail.com',
          password: '12345678910',
      })
      db.close()
  } catch (err) {
    console.error(err)
      console.log('Seeding failed')
  }
}
seed()