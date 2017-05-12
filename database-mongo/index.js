const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/locale');

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

const localeSchema = mongoose.Schema({
  id: { type: String, unique: true },
  name: String,
  address: String,
  phone: String,
  photos: Array,
  rating: Number,
  reviews: Array,
  type: String,
  price: String,
  x_street: String,
  url: String,
});

// var User = mongoose.model('User', userSchema);

const favoritesSchema = mongoose.Schema({
  user_id: { type: String, unique: true, dropDups: true },
  locations: Array,
});

const Locale = mongoose.model('Locale', localeSchema);

module.exports = Locale;
