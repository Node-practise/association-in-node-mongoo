const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  path: String,
  url: String,
  caption: String,
  createdAt: Date
})

module.exports = mongoose.model('Image', imageSchema);