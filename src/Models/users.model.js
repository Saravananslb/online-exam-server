const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  regNo: {
    type: String,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  createdAt: {
      type: Date,
      default: Date.now
  }
});
module.exports = mongoose.model('users', userSchema);