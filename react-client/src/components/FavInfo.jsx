import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types';
import styles from '../css/styles';

const yelpIcon = require('../assets/yelpLogo/Yelp_icon.png');

const FavInfo = props => (
  <div>
    <h3>{props.data.name}</h3>
    <a href={`${props.data.url}`}><img
      src={yelpIcon}
      alt="logo" style={styles.logo}
    /></a>
    <p>Rating: {props.data.rating}</p>
    <p>Phone: {props.data.phone}</p>
    <p>Price: {props.data.price}</p>
    <RaisedButton
      label="Remove"
      // onTouchTap={}
    />
  </div>
);

FavInfo.propTypes = {
  data: PropTypes.object,
};

FavInfo.defaultProps = {
  data: null,
};

export default FavInfo;
