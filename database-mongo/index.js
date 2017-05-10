const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

const db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

//db.createCollection('users');

//might need to adjust server-index.js
let userSchema = mongoose.Schema({
  name: {type: String, unique: true, dropDups: true},
  address: String, 
  phone: String, 
  photos: Array, 
  rating: Number,
  reviews: Array, 
  type: String, 
  price: String, 
  x_street: String, 
  url: String
});

var User = mongoose.model('User', userSchema); 

let localSchema = mongoose.Schema({
  user_id: {type: String, unique: true, dropDups: true}, 
  locations: Array
});

var Local = mongoose.model('Local', localSchema); 

module.exports = {
  User: User, 
  Local: Local
}; 




