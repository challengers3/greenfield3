import React from 'react';
import { Card, CardActions, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import PropTypes from 'prop-types';
import ReviewStars from './ReviewStars';
import styles from '../css/styles';

const yelpIcon = require('../assets/yelpLogo/Yelp_icon.png');

const MainDisplay = (props) => {
  const propsData = props.data;
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
        <p>{propsData.description}</p>
        <p>Type of food: {propsData.categories[0].title}
          <a href={`${propsData.url}`}><img
            src={yelpIcon}
            alt="logo" style={styles.logo}
          /></a></p>
        <p>Street Address: {propsData.location.address1}</p>
        <p>City: {propsData.location.city}</p>
        <p>State: {propsData.location.state},&nbsp;
          {propsData.location.zip_code}</p>
      </CardText>
      <CardActions>
        <IconButton><StarBorder color={styles.mainColor} />
        </IconButton>
      </CardActions>
    </Card>
  );
};

MainDisplay.propTypes = {
  data: PropTypes.object,
};

MainDisplay.defaultProps = {
  data: PropTypes.object,
};

export default MainDisplay;
