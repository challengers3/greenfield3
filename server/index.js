var express = require('express');
var bodyParser = require('body-parser');
var request = require ('request');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
// var items = require('../database-mongo');

var yelpToken = '54robtCPOWAAru28w0M7Qr71NEaFNqygTcxM1xUlg3oX5aXjk3q85eX_MFH0o6SdddycpMcrPuYaV99yy_qAOKOVJWrudk8qnx80uxuCwAyxpgdA62d-27GZIdMIWXYx'
var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));
// 
// 
app.get('/test', function (req, res) {


  request ({ headers: {Authorization: "Bearer " + yelpToken}, uri: 'https://api.yelp.com/v3/businesses/y97u_oCqjAjstK4YOY9ygA'}, (err, response, data) => {
    //  var businessID = data[0].businesses.id;
    var listing = data;
    res.send(data);
  });
  //res.send('GET');
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

// {"categories": [{"alias": "restaurants", "title": ""}, {"alias": "vegan", "title": ""}, {"alias": "gluten_free", "title": ""}], 
// "businesses": [{"id": "y97u_oCqjAjstK4YOY9ygA", "name": "The Flying Falafel"}], "terms": []}