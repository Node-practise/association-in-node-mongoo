const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const db = require('./models')

// Create Tutorial
const createTutorial = function(tutorial){
  return db.Tutorial.create(tutorial).then(docTutorial =>{
    console.log('\n>> Created Turorial: \n',docTutorial);
    return docTutorial;
  })
}

// Create Tag
const createTag = function(tag){
  return db.Tag.create(tag).then(docTag =>{
    console.log('\n>> Created tag: \n', docTag);
    return docTag;
  })
}

// Add Tag to Tutorial
const addTagToTutorial = function(tutorialId, tag){
  return db.Tutorial.findByIdAndUpdate(
    tutorialId,
    {$push: {tags: tag._id}},
    {new: true, useFindAndModify: false}
  )
}

const run = async function(){
  var tutorial = await createTutorial({
    title: 'Tutorial #1',
    author: 'beckoder',
  });

  var tagA = await createTag({
    name: 'tagA',
    slug: 'tag-1'
  });

  var tagB = await createTag({
    name: 'tagB',
    slug: 'tag-1'
  })

  var tagTutorial = await addTagToTutorial(tutorial._id, tagA)
  console.log('\n>> Tutorial1: \n', tagTutorial)
}


// Connecting database
const DB_URL = 'mongodb://localhost:27017/manyMany'
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Successfully connected to mongodb'))
.catch((error) => console.log('Connection error', err))

// Running query function
run()