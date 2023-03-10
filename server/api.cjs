const router = require('express').Router();
const {User, Score} = require('./db/index.cjs')

router.post('/signup', async (req, res, next) => {
    try {
    const newUser = await User.create(req.body)
    res.send(newUser)
    } catch (err) {
        console.error(err)
}
})

router.get('/saveTypingData', (req, res, next) => {

})

module.exports = router;