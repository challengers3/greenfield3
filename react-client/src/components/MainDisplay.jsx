import React from 'react';
import { Card, CardActions, CardText } from 'material-ui/Card';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Speaker from 'material-ui/svg-icons/hardware/keyboard-voice';

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
        <FlatButton
          icon={<Speaker alt="Speaker" />}
          onTouchTap={this.props.startSpeech}
        />
        <CardText>
          <h1>{this.props.data.name}</h1>
          <ReviewStars
            rating={this.props.data.rating}
          />
          <p>Total Reviews: {this.props.data.reviewCount}</p>
          <RaisedButton
            label="Reviews"
            onTouchTap={this.onReviewToggle}
          />
          <Dialog
            title="Reviews"
            autoScrollBodyContent={true}
            open={this.state.reviewToggle}
            onRequestClose={this.onReviewToggle}
          >
            {this.props.data.reviews.map(oneReview =>
              <div key={oneReview.reviewer_name}>
                <h3>{oneReview.reviewer_name}</h3>
                <p>Rating: {oneReview.rating}</p>
                <p>{oneReview.text}</p>
              </div>,
            )}
          </Dialog>
          <p>Type of food: {this.props.data.type}
            <a href={`${this.props.data.url}`}><img
              src={yelpIcon}
              alt="logo" style={styles.logo}
            /></a></p>
          <p>Price: {this.props.data.price}</p>
          <p>Street Address: {this.props.data.address}</p>
          <p>Contact info: {this.props.data.phone}</p>
        </CardText>
        <CardActions>

          <RaisedButton
            label="Save to Favorites"
            backgroundColor="#FFA726"
            onTouchTap={this.onSave}
          />

        </CardActions>
      </Card>
    );
  }
}

MainDisplay.propTypes = {
  data: PropTypes.object,
  onSave: PropTypes.func,
  startSpeech: PropTypes.func,
};

MainDisplay.defaultProps = {
  data: null,
  onSave: PropTypes.func,
  startSpeech: PropTypes.func,
};

export default MainDisplay;