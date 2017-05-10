import React from 'react';
import { Card, CardActions, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';

import ReviewStars from './ReviewStars';
import styles from '../css/styles';

const yelpIcon = require('../assets/yelpLogo/Yelp_icon.png');

class MainDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
    };
    this.onToggle = this.onToggle.bind(this);
    this.saveToFavorite = this.saveToFavorite.bind(this);
  }

  saveToFavorite() {
    console.log(JSON.stringify(this.props.data))
    axios.post('/saveToFav', this.props.data);
  }

  onToggle() {
    this.setState({
      toggle: !this.state.toggle,
    });
  }

  render() {
    return (
      <Card style={styles.cardStyle}>
        <CardText>
          <h1>{this.props.data.name}</h1>
          <ReviewStars
            rating={this.props.data.rating}
          />
          <p>Total Reviews: {this.props.data.reviewCount}</p>
          <RaisedButton
            label="Reviews"
            onTouchTap={this.onToggle}
          />
          <Dialog
            title="Reviews"
            autoScrollBodyContent={true}
            open={this.state.toggle}
            onRequestClose={this.onToggle}
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

          <IconButton onTouchTap={this.saveToFavorite}>

            <StarBorder color={styles.mainColor} />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

MainDisplay.propTypes = {
  data: PropTypes.object,
};

MainDisplay.defaultProps = {
  data: null,
};

export default MainDisplay;
