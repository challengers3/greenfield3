const express = require('express');
const bodyParser = require('body-parser');
const items = require('../database-mongo');
const request = require('request');

const yelpToken = '54robtCPOWAAru28w0M7Qr71NEaFNqygTcxM1xUlg3oX5aXjk3q85eX_MFH0o6SdddycpMcrPuYaV99yy_qAOKOVJWrudk8qnx80uxuCwAyxpgdA62d-27GZIdMIWXYx';

const app = express();

// UNCOMMENT FOR REACT
app.use(express.static(`${__dirname}/../react-client/dist`));
app.use(bodyParser.json());

app.get('/items', (req, res) => {
  items.selectAll((err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.get('/search', (req, res) => {
  request({ headers: { Authorization: `Bearer ${yelpToken}` }, uri: 'https://api.yelp.com/v3/businesses/search?term=popsons&latitude=37.7876&longitude=-122.4001&limit=1' }, (err, response, data) => {
    const listing = data;
    res.send(data);
  });
  // res.send('GET');
});

app.listen(3000, () => {
  console.log('listening on port 3000!');
});
