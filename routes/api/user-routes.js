const router = require('express').Router()
const { User } = require('../../models')

// The `/api/users` endpoint

// get all users
router.get('/', async (req, res) => {
  User.find({}, function (err, small) {
    if (err) return console.log(err)
    res.json(small)
  })
})

// get one user by id
router.get('/:id', async (req, res) => {
  res.json(await User.find({ _id: req.params.id }))
})

// create new user
router.post('/', (req, res) => {
  User.create(req.body, function (err, small) {
    if (err) return console.log(err)
    res.json(small)
  })
})

// update user
router.put('/:id', (req, res) => {
  User.updateOne({ _id: req.params.id }, req.body, function (err, res) {
    if (err) return console.log(err)
    res.json(res)
  })
})

router.delete('/:id', (req, res) => {
  User.updateOne({ _id: req.body.id }, req.body.new, function (err, res) {
    if (err) return console.log(err)
    res.json(res)
  })
})

router.post('/:userId/friends/:friendId', (req, res) => {
  User.findById(req.params.userId).friends.push(req.params.friendId)
  res.json({ success: true })
})
router.delete('/:userId/friends/:friendId', (req, res) => {
  User.findById(req.params.userId).friends.id(req.params.friendId).remove()
  res.json({ success: true })
})

module.exports = router
