const express = require('express');
const bodyParser = require('body-parser');
const Locale = require('../database-mongo');
const request = require ('request');
const axios = require('axios');
const yelpToken = //your yelp token here;
let location = {};

const app = express();

app.use(express.static(`${__dirname}/../react-client/dist`));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('hello');
  res.end
})

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
  const input = JSON.stringify(req.query.query);
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

  const userLat = location.lat;
  const userLong = location.long;

// Use of GraphQL consolidates multiple API calls
// https://www.yelp.com/developers/graphql/guides/intro
  axios({
    method: 'post',
    headers: headers,
    url: `${apiURL}`,

    data: `{ 
      search(term: ${input},
        latitude: ${userLat},
        longitude: ${userLong},
        radius: 1200,
        limit: 1
        )

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
      console.log(yelpBizData)
      let localeData = yelpBizData.data.data.search.business[0];

      console.log(JSON.stringify(localeData.coordinates.latitude));
      console.log(JSON.stringify(localeData.coordinates.longitude));
      localeObject.id = localeData.id;
      localeObject.name = localeData.name;
      localeObject.address = localeData.location.address1;
      localeObject.cross = localeData.location.cross_streets;
      localeObject.phone = localeData.display_phone;
      localeObject.rating = localeData.rating;
      localeObject.reviewCount = localeData.review_count;
      localeObject.type = localeData.categories[0].title
      localeObject.photos = localeData.photos;
      localeObject.url = localeData.url;
      localeObject.reviews = localeData.reviews;
      localeObject.lat = localeData.coordinates.latitude;
      localeObject.lng = localeData.coordinates.longitude;

      res.send(localeObject);
      res.end();
    }).catch( err => console.log('Error: ', err));
  }
);


app.listen(process.env.PORT || 1337, () => {
  console.log('listening on port 1337!');
});
