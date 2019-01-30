const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/restaurant-finder', {useNewUrlParser: true}).then(() => {
  console.log('connected to db');
}).catch((err) => {
   console.log(err); 
});

// const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost:ds139934/restaurant' 

mongoose.set('useCreateIndex', true);

module.exports = {
    mongoose
}