const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    
    // Insert one
    // Recipe.create(data[0])
    //   .then(res => console.log(res))
    //   .catch(err => console.log(err))

    // Insert many
    Recipe.insertMany(data)
      .then(data => {
        data.forEach(recipe => console.log(recipe.title))

        // Update Rigationi
        Recipe.findOneAndUpdate(
          { title: 'Rigatoni alla Genovese'},
          { duration: 100},
          { new: true, useFindAndModify: false })
          .then(data => console.log(`Updated ${data.title}`))
          .catch(err => console.log(err));

        // Delete carrot cake
        Recipe.deleteOne({ title: 'Carrot Cake'})
          .then(res => {
            console.log(`Success!`);
            mongoose.disconnect()
            .then(res => console.log('Disconnected'))
            .catch(err => console.log(err))
          })
          .catch(err => console.log(err));

      })
      .catch(err => console.log(err))
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });