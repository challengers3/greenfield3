var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mongo');
var request = require ('request');
var yelpToken = '54robtCPOWAAru28w0M7Qr71NEaFNqygTcxM1xUlg3oX5aXjk3q85eX_MFH0o6SdddycpMcrPuYaV99yy_qAOKOVJWrudk8qnx80uxuCwAyxpgdA62d-27GZIdMIWXYx';
var location = {};

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.post('/location', (req, res) => {
  location = req.body;
  res.end();
})

app.get('/search', function(req, res) {
  var input = req.query.query;
  var apiURL = 'https://api.yelp.com/v3/businesses/'
  var authHeader = {Authorization: "Bearer " + yelpToken}
  var placeObject = {
    name: '',
    rating: 0,
    reviews: []
  };
  var userLat = location.lat;
  var userLong = location.long;
  console.log(location)

  request( { headers: authHeader, uri: `${apiURL}search?term=${input}&latitude=${userLat}&longitude=${userLong}&limit=1` }, (err, response, data) => {
    var businessID = JSON.parse(data).businesses[0].id;

    request( { headers: authHeader,uri:`${apiURL}${businessID}` }, (err, response, placeData) => {
      var placeData = JSON.parse(placeData);

      placeObject.name = placeData.name;
      placeObject.rating = placeData.rating;
    });

    request( { headers: authHeader,uri:`${apiURL}${businessID}/reviews` }, (err, response, reviewData) => {
      var reviewData = JSON.parse(reviewData).reviews;

      for(var i = 0; i < reviewData.length; i++) {
        placeObject.reviews.push({
          'text': reviewData[i].text,
          'rating': reviewData[i].rating,
          'reviewer_name': reviewData[i].user.name,
          'url': reviewData[i].url
        });
      }
      // save to the DB at this point
      // another comment

      res.send(placeObject);
    });
  });
});


app.listen(3000, function() {
  console.log('listening on port 3000!');
});
