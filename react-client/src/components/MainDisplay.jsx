import React from 'react';
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

import ReviewStars from './ReviewStars';
import styles from '../css/styles';

const yelpIcon = require('../assets/yelpLogo/Yelp_icon.png');

class MainDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviewToggle: false,
    };
    this.onReviewToggle = this.onReviewToggle.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  onReviewToggle() {
    this.setState({
      reviewToggle: !this.state.reviewToggle,
    });
  }

  onSave() {
    this.props.onSave(this.props.data);
  }

  render() {
    return (
      <Card style={styles.cardStyle}>
        <CardMedia
          overlay={<CardTitle
            title={this.props.data.name}
            subtitle={`${this.props.data.phone} ~ ${this.props.data.address}`}
          />}
        >
          <img
            src={this.props.data.photos}
            alt="location data"
            style={{borderRadius: '12px', maxHeight: '440px', width: 'auto'}}
          />
        </CardMedia>
        <CardText>
          <div style={styles.ratingBlock}>
            <ReviewStars rating={this.props.data.rating} /> {this.props.data.reviewCount} Reviews
          </div>
          <div>
            {this.props.data.reviews.map(review =>
              <div key={review.url}>
                <p>"{review.text}"<br />
                <a href={review.url}>Read More</a>
                </p>
              </div>,
            )}
          </div>
        </CardText>
        <CardActions>
          <div style={styles.reviewBlock}>
            <RaisedButton
              label="Save to Favorites"
              labelColor="#fff"
              backgroundColor="#FFA726"
              onTouchTap={this.onSave}
            /><a href={this.props.data.url}>
            <img
              src={yelpIcon}
              alt="logo" style={styles.logo}
            /></a>
          </div>
        </CardActions>
      </Card>
    );
  }
}

MainDisplay.propTypes = {
  data: PropTypes.object,
  onSave: PropTypes.func,
};

MainDisplay.defaultProps = {
  data: null,
  onSave: PropTypes.func,
};

export default MainDisplay;