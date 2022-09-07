const mongoose = require('mongoose')
const Reaction = require('./Reaction')

const thoughtSchema = new mongoose.Schema({
  thoughtText: String,
  createdAt: Date,
  username: String,
  reactions: [Reaction]
})

const Thought = mongoose.model('Thought', thoughtSchema)

module.exports = {
  Thought
}
