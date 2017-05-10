var express = require('express');
var bodyParser = require('body-parser');
<<<<<<< HEAD
var Locale = require('../database-mongo');
=======
var db = require('../database-mongo');
>>>>>>> Fixed logic for quicker load
var request = require ('request');
var axios = require('axios');
var yelpToken = '54robtCPOWAAru28w0M7Qr71NEaFNqygTcxM1xUlg3oX5aXjk3q85eX_MFH0o6SdddycpMcrPuYaV99yy_qAOKOVJWrudk8qnx80uxuCwAyxpgdA62d-27GZIdMIWXYx';
var location = {};

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//getting items from the database
//might need to adjust first parameter to fit database exports

app.get('/items', function (req, res) {
  db.selectAll(function(err, data) {
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
}); 

//something wrong with the path '/saveToFav'
//need to direct the post request to this path because
//it's not being received

app.post('/saveToFav', (req, res) => {

<<<<<<< HEAD
  let locale = req.body;

  console.log(locale);

  let favorite = new Locale({
    id:locale.id,
    name: locale.name, 
    address: locale.address, 
    phone: locale.phone, 
    photos: locale.photos, 
    rating: locale.rating,
    reviews: locale.reviews,   
    type: locale.type, 
    price: locale.price, 
    x_street: locale.cross, 
    url: locale.url, 
  });
  favorite.save();

  res.end()
=======
  var info = req.body;

  // db.findOne({name: info.name}, function(error, data) {

  //   if (data) {
  //     console.log('already in database');

  //   } else {
      var DB = new db.User({
          name: info.name, //might need to change into obj format
          address: info.address,
          phone: info.phone,
          photos: info.photos,
          rating: info.rating,
          type: info.type,
          price: info.price,
          x_street: info.cross,
          url: info.url
        });

      DB.save();

        // DB.save(error => {
        //   if (error) {
        //     console.log('Error Saving to Database', error);
        //     res.send('error saving to db');
        //   } else {
        //     console.log('Saved to Database');
        //     res.send('saved to databaseeee')
        //   }
        // });




  res.end();
>>>>>>> Fixed logic for quicker load
});


app.get('/search', function(req, res) {
  let input = req.query.query;
  let apiURL = 'https://api.yelp.com/v3/businesses/'
  let authHeader = { Authorization: "Bearer " + yelpToken }
  let localeObject = {
    id: '',
    name: '',
    address: '',
    phone: '',
    photos: [],
    rating: 0,
    reviews: [],
    type: '',
    price: '',
    x_street: '',
    url: ''
  };
  let userLat = location.lat; //37.7836964
  let userLong = location.long; //-122.40916799999998

  console.log(userLat, userLong)

  let getBusinessData = (businessID) => {
    axios({
      method: 'get',
      headers: authHeader,
      url: `${apiURL}${businessID}`
    }).then( yelpBizData => {
      let localeData = yelpBizData.data;

      localeObject.id = businessID;
      localeObject.name = localeData.name;
      localeObject.address = localeData.location.address1;
      localeObject.cross = localeData.location.cross_streets;
      localeObject.phone = localeData.display_phone;
      localeObject.rating = localeData.rating;
      localeObject.reviewCount = localeData.review_count;
      localeObject.type = localeData.categories[0].title;
      localeObject.price = localeData.price;
      localeObject.photos = localeData.photos;
      localeObject.url = localeData.url;
    }).catch( err => console.log('baseLocaleError: ', err));
  }

  let getBusinessReviews = (businessID) => {
    axios({
      method: 'get',
      headers: authHeader,
      url: `${apiURL}${businessID}/reviews`
    }).then( yelpBizData => {
      let localeData = yelpBizData.data.reviews;
        for(var i = 0; i < 3; i++) {
          localeObject.reviews.push({
            'text': localeData[i].text,
            'rating': localeData[i].rating,
            'reviewer_name': localeData[i].user.name,
            'url': localeData[i].url
          });
        }
    }).catch( err => console.log('businessReviewError: ', err));
  }

  axios({
    method: 'get',
    headers: authHeader,
    url: `${apiURL}search?term=${input}&latitude=${userLat}&longitude=${userLong}&limit=1`
  }).then( yelpData => yelpData.data.businesses[0].id)
  .then( businessID => {
    getBusinessData(businessID);
    getBusinessReviews(businessID);
    setTimeout( () => res.send(localeObject), 2000 );
  }).catch( err => console.log('promise error: ', err));
});

app.post('/saveToFav', (req, res) => {
  let locale = req.body;

  let favorite = new Locale({
    //
  })
  res.send(req.body);

  res.end();
})

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
