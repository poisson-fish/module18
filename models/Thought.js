const mongoose = require('mongoose')
const { Reaction } = require('./Reaction')

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  username: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 32
  },
  reactions: [Reaction]
}, {
  virtuals: {
    reactionCount: {
      get () {
        return this.reactions.length
      }
    },
    timestamp: {
      get () {
        return this.reactions.length
      }
    }
  }
})

const Thought = mongoose.model('Thought', thoughtSchema)

module.exports = {
  Thought
}
