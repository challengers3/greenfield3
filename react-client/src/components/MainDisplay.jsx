import React from 'react';
import { Card, CardActions, CardText } from 'material-ui/Card';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import annyang from 'annyang';
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
      // data: this.props.data,
    };
    this.onReviewToggle = this.onReviewToggle.bind(this);
    this.onSave = this.onSave.bind(this);
    this.startSpeech = this.startSpeech.bind(this);
  }

  // componentWillReceiveProps(newProps) {
  //   this.setState({
  //     data: newProps,
  //   })
  // }

  onReviewToggle() {
    this.setState({
      reviewToggle: !this.state.reviewToggle,
    });
  }

  onSave() {
    console.log('ON SAVE')
    this.props.onSave(this.props.data);
  }

  startSpeech() {
    if (annyang) {
      const commands = {
        'show me *input': (input) => {
          this.props.onSearch(input);
        },
        'go to favorites': () => {
          this.props.onClickFav();
        },
        'go to front': () => {
          this.props.onClickMain();
        },
        'save to (fav) favorites': () => {
          console.log('this is', this)
          console.log(this.props.data)
          this.onSave(this.props.data);
        }
        // 'remove from (fav) favorites': () => {
        //   this.removeFromFavorite();
        // },
      };
      annyang.addCommands(commands);
      annyang.debug();
      annyang.start();
    }
  }

  render() {
    return (
      <Card style={styles.cardStyle}>
        <FlatButton
          icon={<Speaker alt="Speaker" />}
          onTouchTap={this.startSpeech}
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
  onSearch: PropTypes.func,
  onClickFav: PropTypes.func,
  onClickMain: PropTypes.func,
};

MainDisplay.defaultProps = {
  data: null,
  onSave: PropTypes.func,
  onSearch: PropTypes.func,
  onClickFav: PropTypes.func,
  onClickMain: PropTypes.func,
};

export default MainDisplay;
