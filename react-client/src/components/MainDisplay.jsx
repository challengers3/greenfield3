import React from 'react';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import PropTypes from 'prop-types';
import $ from 'jquery';

import ReviewStars from './ReviewStars';
import styles from '../css/styles';

const yelpIcon = require('../assets/yelpLogo/Yelp_icon.png');

const MainDisplay = (props) => {
  const propsData = props.data;
  const saveToFavorite = () => {
    $.ajax({
      type: 'POST',
      url: '/save',
      data: JSON.stringify(propsData),
      error: (err) => {
        if (err) throw err;
      },
    });
  };

  return (
    <Card style={styles.cardStyle}>
      <CardHeader
        title={propsData.name}
        subtitle={<ReviewStars
          rating={propsData.rating}
        />}
      />
      <CardTitle title="Description" />
      <CardText>
        <p>Type of food: {propsData.type}
          <a href={`${propsData.url}`}><img
            src={yelpIcon}
            alt="logo" style={styles.logo}
          /></a></p>
        <p>Price: {propsData.price}</p>
        <p>Street Address: {propsData.address}</p>
        <p>Contact info: {propsData.phone}</p>
      </CardText>
      <CardActions>
        <IconButton onTouchTap={() => saveToFavorite}>
          <StarBorder color={styles.mainColor} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

MainDisplay.propTypes = {
  data: PropTypes.object,
};

MainDisplay.defaultProps = {
  data: null,
};

export default MainDisplay;
