const router = require('express').Router()
const { Thought, User } = require('../../models')

// The `/api/thoughts` endpoint

// get all thoughts
router.get('/', async (req, res) => {
  Thought.find({}, function (err, small) {
    if (err) return console.log(err)
    res.json(small)
  })
})

// get one thought by id
router.get('/:id', async (req, res) => {
  res.json(await Thought.find({ _id: req.params.id }))
})

// create new thought
router.post('/:id', (req, res) => {
  User.findOne({ _id: req.params.id }, function (findErr, findRes) {
    if (findErr) return console.log(findErr)
    // create a thought and add it to the user
    Thought.create(req.body, function (err, small) {
      if (err) return console.log(err)
      findRes.thoughts.push(small.id)
      findRes.save(function (err, saveRes) {
        if (err) return console.log(err)
        res.json(saveRes)
      })
    })
  })
})

// update thought
router.put('/:id', (req, res) => {
  Thought.updateOne({ _id: req.params.id }, req.body, function (err, res) {
    if (err) return console.log(err)
    res.json(res)
  })
})

router.delete('/:id', (req, routerRes) => {
  Thought.deleteOne({ _id: req.params.id }, function (err, res) {
    if (err) return console.log(err)
    routerRes.json(res)
  })
})

router.post('/:thoughtId/reactions', (req, res) => {
  Thought.findById(req.params.thoughtId, function (err, small) {
    if (err) return console.log(err)
    const subdoc = small.reactions.create(req.body)
    small.reactions.push(subdoc)
    small.save(function (err) {
      if (err) return console.log(err)
      res.json(small)
    })
  })
})
router.delete('/:thoughtId/reactions/:reactionId', (req, res) => {
  Thought.findById(req.params.thoughtId, function (err, small) {
    if (err) return console.log(err)
    small.friends = small.reactions.filter(sub => req.params.reactionId !== sub.id)
    small.save(function (err) {
      if (err) return console.log(err)
      res.json(small)
    })
  })
})

module.exports = router
