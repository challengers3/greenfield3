import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import Subheader from 'material-ui/Subheader';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  gridList: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: 'auto',
  },
  titleStyle: {
    color: 'rgb(0, 188, 212)',
  },
};


//const tile data/images from API

var fakeData = {"id": "the-flying-falafel-san-francisco-3", 
  "name": "The Flying Falafel", 
  "image_url": "https://s3-media1.fl.yelpcdn.com/bphoto/O4zKAcpg4qFUQj5Kd5fjpQ/o.jpg", 
  "is_claimed": true, 
  "is_closed": false, 
  "url": "https://www.yelp.com/biz/the-flying-falafel-san-francisco-3?adjust_creative=WGQlPTKmNG8ZM98Vb93ikg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=WGQlPTKmNG8ZM98Vb93ikg", 
  "phone": "+14159641003", 
  "display_phone": "(415) 964-1003", 
  "review_count": 564, 
  "categories": [{"alias": "falafel", "title": "Falafel"}, {"alias": "vegan", "title": "Vegan"}], 
  "rating": 4.5, 
  "location": 
    {"address1": "1051 Market St", "address2": null, "address3": "", "city": "San Francisco", "zip_code": "94103", "country": "US", "state": "CA", 
    "display_address": ["1051 Market St", "San Francisco, CA 94103"], 
    "cross_streets": "Golden Gate Ave & Taylor St"}, 
  "coordinates": {"latitude": 37.7812488, "longitude": -122.411304}, 
  "photos": ["https://s3-media3.fl.yelpcdn.com/bphoto/O4zKAcpg4qFUQj5Kd5fjpQ/o.jpg", "https://s3-media1.fl.yelpcdn.com/bphoto/dUBlXr17UA7-LcyhEvymdg/o.jpg", "https://s3-media3.fl.yelpcdn.com/bphoto/1LIk-qzrR5Dz-f96lVyazw/o.jpg"], 
  "price": "$", 
  "hours": [{"open": [{"is_overnight": false, "start": "1000", "end": "2030", "day": 0}, {"is_overnight": false, "start": "1000", "end": "2030", "day": 1}, {"is_overnight": false, "start": "1000", "end": "2030", "day": 2}, {"is_overnight": false, "start": "1000", "end": "2030", "day": 3}, {"is_overnight": false, "start": "1000", "end": "2030", "day": 4}, {"is_overnight": false, "start": "1000", "end": "2030", "day": 5}, {"is_overnight": false, "start": "1000", "end": "2030", "day": 6}], "hours_type": "REGULAR", "is_open_now": true}], 
  "transactions": ["pickup"]}


const List = (props) => (
  <div style={styles.root}>
    <GridList style={styles.gridList} cols={2.2}>
      {fakeData.photos.map((tile) => (
        <GridTile
          key={tile}
          actionIcon={<IconButton><StarBorder color="rgb(0, 188, 212)" /></IconButton>}
          titleStyle={styles.titleStyle}
          titleBackground="linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
        >
          <img src={tile} />
        </GridTile>
      ))}
    </GridList>
  </div>
)


export default List;

