const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  name: String,
  slug: String,
  tutorial: [{
    type: Schema.Types.ObjectId,
    ref: 'Tutorial'
  }]
})

module.exports = mongoose.model('Tag', tagSchema)


// Note:
  // ref helps us to get full fields of particular model with ``populate()`` method.