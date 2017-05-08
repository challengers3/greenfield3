var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var itemSchema = mongoose.Schema({
  business: String, 
  id: Number,
  name: String,
  photos: Array,
  ratings: Array, 
  reviews: Array
});


var Item = mongoose.model('Item', itemSchema);
module.exports = Item; 


