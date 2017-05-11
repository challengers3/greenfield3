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
      reviewToggle: false,
      toggleStar: false
    };
    this.onReviewToggle = this.onReviewToggle.bind(this);
    this.saveToFavorite = this.saveToFavorite.bind(this);
  }


  onReviewToggle() {
    this.setState({
      reviewToggle: !this.state.reviewToggle,
    });
  }

  saveToFavorite() {
    this.setState({
      toggleStar: !this.state.toggleStar
    });

    if (this.state.toggleStar === false) {
      axios.post('/saveToFav', this.props.data);
      console.log('first click, should add to database'); 

    } else {
      axios.post('/saveToFav', this.props.data); 

      console.log('second star click: toggle star is TRUE, want to remove from db');
      //delete from database
        //maybe send axios.get and then remove?
    }
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
