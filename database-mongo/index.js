const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/locale');

const db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

let localeSchema = mongoose.Schema({
  id: String,
  name: String,
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

//var User = mongoose.model('User', userSchema);

let favoritesSchema = mongoose.Schema({
  user_id: {type: String, unique: true, dropDups: true},
  locations: Array
});

var Locale = mongoose.model('Locale', localeSchema);

module.exports = Locale;
