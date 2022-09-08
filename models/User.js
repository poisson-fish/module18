const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 16
  },
  email: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 32
  },
  thoughts: [mongoose.ObjectId],
  friends: [mongoose.ObjectId]
}, {
  virtuals: {
    friendCount: {
      get () {
        return this.friends.length
      }
    }
  }
})

const User = mongoose.model('User', userSchema)

module.exports = {
  User
}
