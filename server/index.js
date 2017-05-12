const express = require('express');
const bodyParser = require('body-parser');
const Locale = require('../database-mongo');
const request = require ('request');
const axios = require('axios');
const yelpToken = '54robtCPOWAAru28w0M7Qr71NEaFNqygTcxM1xUlg3oX5aXjk3q85eX_MFH0o6SdddycpMcrPuYaV99yy_qAOKOVJWrudk8qnx80uxuCwAyxpgdA62d-27GZIdMIWXYx';
let location = {};

const app = express();

app.use(express.static(`${__dirname}/../react-client/dist`));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// app.get('/items', (req, res) => {
//   db.selectAll((err, data) => {
//     if (err) {
//       res.sendStatus(500);
//     } else {
//       res.json(data);
//     }
//   });
// });

// need to reconfigure later to retrieve by user
app.get('/storage/retrieve', (req, res) => {
  Locale.find({}, (err, results) => {
    res.send(results);
  });
});

app.post('/storage/remove', (req, res) => {
  Locale.find({ _id: req.body._id }, (err, data) => {
    if (err) throw err;
    Locale.deleteOne({ _id: req.body._id }, (err, data) => {});
    res.end('Removed from storage/remove');
  });
});

app.post('/location', (req, res) => {
  location = req.body;
  res.end();
});

app.post('/storage', (req, res) => {
  const locale = req.body;
  console.log(locale);
  const favorite = new Locale({
    id: locale.id,

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

  res.end();
});


app.get('/search', (req, res) => {
  const input = req.query.query;
  const apiURL = 'https://api.yelp.com/v3/graphql'
  const headers = { 
    'Authorization': "Bearer " + yelpToken,
    'Content-Type': 'application/json' 
  };
  const localeObject = {
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
    url: '',
  };

  let userLat = 37.882562199999995; //location.lat;
  let userLong = -122.27564149999998; //location.long;

// Use of GraphQL consolidates multiple API calls
// https://www.yelp.com/developers/graphql/guides/intro
  axios({
    method: 'post',
    headers: headers,
    url: `${apiURL}`,
    data: `{ 
      search(term: "safeway",
        latitude: ${userLat},
        longitude: ${userLong}, 
        limit: 1,
        sort_by: "distance") 

        {
          business {
            id
             name
             location{
               address1
             }
             coordinates {
               latitude
               longitude
             }
             display_phone
             rating
             review_count
             categories{
              title
             }
             photos
             url
             reviews {
               text
               rating
               user {
                name
               }
               url
             }
          }
        }
      }` 
  }).then( yelpBizData => {
      let localeData = yelpBizData.data.data.search.business[0];

      console.log(JSON.stringify(localeData));
      localeObject.id = localeData.id;
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
      localeObject.reviews = localeData.reviews

      res.send(localeObject);
      res.end();
    }).catch( err => console.log('Error: ', err));
  }
);


app.listen(3000, () => {
  console.log('listening on port 3000!');
});