import React from 'react';
import Dialog from 'material-ui/Dialog';
import PropTypes from 'prop-types';

class ReviewPop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
    };
  }

  render() {
    return (
      <div>
        <Dialog
          title="Top Reviews"
          open={this.state.toggle}
          onRequestClose={this.handleToggle}
        >
          <h3>{this.props.review.reviewer_name}</h3>
        </Dialog>
      </div>
    );
  }
}

ReviewPop.propTypes = {
  review: PropTypes.array,
  reviewer_name: PropTypes.string,
};

ReviewPop.defaultProps = {
  review: [],
  reviewer_name: '',
};

export default ReviewPop;
