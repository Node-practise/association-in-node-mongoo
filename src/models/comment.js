const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  username: String,
  text: String,
  createdAt: Date
})

module.exports = mongoose.model('Comment', commentSchema);
