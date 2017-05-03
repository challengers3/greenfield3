var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mongo');
var request = require ('request');
var yelpToken = '54robtCPOWAAru28w0M7Qr71NEaFNqygTcxM1xUlg3oX5aXjk3q85eX_MFH0o6SdddycpMcrPuYaV99yy_qAOKOVJWrudk8qnx80uxuCwAyxpgdA62d-27GZIdMIWXYx'

var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});


app.get('/search', function (req, res) {
  var input = "flying%20falafel"//req.query.query;
  var apiURL = 'https://api.yelp.com/v3/businesses/'
  var authHeader = {Authorization: "Bearer " + yelpToken}
  var placeObject = {
    name: '',
    rating: 0,
    reviews: []
  };

  request( { headers: authHeader, uri: `${apiURL}search?term=${input}&latitude=37.7876&longitude=-122.4001&limit=1` }, (err, response, data) => {
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

      // console.log(JSON.stringify(placeObject)); 
      // save to the DB at this point

      res.send("Done");
    });
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
