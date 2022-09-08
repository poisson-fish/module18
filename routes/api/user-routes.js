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

// delete user
router.delete('/:id', (req, res) => {
  User.updateOne({ _id: req.body.id }, req.body.new, function (err, res) {
    if (err) return console.log(err)
    res.json(res)
  })
})

// add friend
router.post('/:userId/friends/:friendId', (req, res) => {
  User.findById(req.params.userId, function (err, small) {
    if (err) return console.log(err)
    small.friends.push(req.params.friendId)
    small.save(function (err) {
      if (err) return console.log(err)
      res.json(small)
    })
  })
})

// delete friend
router.delete('/:userId/friends/:friendId', (req, res) => {
  User.findById(req.params.userId, function (err, small) {
    if (err) return console.log(err)
    small.friends = small.friends.filter(sub => req.params.friendId !== sub.id)
    small.save(function (err) {
      if (err) return console.log(err)
      res.json(small)
    })
  })
})

module.exports = router
