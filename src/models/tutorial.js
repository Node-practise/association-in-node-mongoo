// const mongoose = require('mongoose')
// const Schema = mongoose.Schema;

// const tutorialSchema = new Schema({
//   title: String,
//   author: String,
//   images: []
// })

// module.exports = mongoose.model('Tutorial', tutorialSchema)

const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const tutorialSchema = new Schema({
  title: String,
  author: String,
  images: [],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  // Added category model later to enhance tutorial features
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  tags: [{
    type: Schema.Types.ObjectId,
    ref: 'Tag'
  }]
})

module.exports = mongoose.model('Tutorial', tutorialSchema)