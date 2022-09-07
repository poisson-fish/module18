const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
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
