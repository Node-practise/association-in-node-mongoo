const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const db = require('./models')


const DB_URL = 'mongodb://localhost:27017/manyMany'
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Successfully connected to mongodb'))
.catch((error) => console.log('Connection error', err))


// Create tutorial
const createTutorial = function(tutorial){
  return db.Tutorial.create(tutorial)
  .then(docTutorial => {
    console.log('Created Tutorial: ', docTutorial)
    return docTutorial;
  })
}

const createImage = function(tutorialId, image){
  console.log('Add image', image);
  return db.Image.create(image)
    .then(docImage => {
      return db.Tutorial.findByIdAndUpdate(
                tutorialId,
                {$push: {images: {url: image.url,caption: image.caption}}},
                { new: true, useFindAndModify: false })
      })
}

const createComment = function(tutorialId, comment){
  return db.Comment.create(comment).then(docComment => {
    console.log('created comment:', docComment);
    return db.Tutorial.findByIdAndUpdate(
      tutorialId,
      {$push: {comments: docComment._id}},
      { new: true, useFindAndModify: false });
  })
}

const getTutorialWithPopulate = function(id){
  return db.Tutorial.findById(id).populate('comments')
}

const createCategory = function(category){
  return db.Category.create(category).then(docCategory => {
    console.log('\n>> Created category: \n', docCategory)
    return docCategory;
  })
}

const AddTutorialToCategory = function(tutorialId, categoryId){
  return db.Tutorial.findByIdAndUpdate(
    tutorialId,
    {category: categoryId},
    {new: true, useFindAndModify: false}
  )
}

const getTutorialsInCategory = function(categoryId){
  return db.Tutorial.find({category: categoryId})
                    .populate('category')
}

const run = async function(){
  var tutorial = await createTutorial({
                        title: 'Tutorial #1',
                        author: 'bezkoder'
                      })
  
  // console.log("\n>> Tutorial:\n", tutorial);
  // tutorial = await createImage(tutorial.Id, {
  //                   path: 'image/url.png',
  //                   url: 'images/image.png',
  //                   caption: 'Mongo database',
  //                   createdAt: Date.now()
  //                 });

  // console.log("\n>> Tutorial:\n", tutorial);
  // // Re-creating the image
  // tutorial = await createImage(tutorial._id, {
  //                   path: "sites/uploads/images/one-to-many.png",
  //                   url: "/images/one-to-many.png",
  //                   caption: "One to Many Relationship",
  //                   createdAt: Date.now()
  //                 });
  // console.log("\n>> Tutorial:\n", tutorial);
  console.log('------------------------------');
  // Creating Comment and populating with following Tutorials.
  tutorial = await createComment(tutorial._id, {
    userame: 'Jack',
    text: 'This is a great tutorial.',
    createdAt: Date.now()
  })
  console.log('\n>> Tutorial: \n', tutorial)
  tutorial = await createComment(tutorial._id, {
    username: 'Mary',
    text: 'Thankyou, It helps me alot.',
    createdAt: Date.now()
  })
  console.log("\n>> Tutorial:\n", tutorial);
  tutorial = await getTutorialWithPopulate(tutorial._id);
  console.log('\n>> populated Tutorial: \n', tutorial);
  console.log('------------------------------');
  // Creating category and adding it with following Tutorials.
  var category = await createCategory({
    name: 'Node js',
    description: 'Node js tutorial'
  })
  tutorial = await AddTutorialToCategory(tutorial._id, category._id)
  console.log('\n>> Tutorial: \n', tutorial)
  var tutorials = await getTutorialsInCategory(category._id)
  console.log('\n>> All Tutorials in Category: \n', tutorials)
}

run();