import React from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { GridList, GridTile } from 'material-ui/GridList';

import styles from '../css/styles';


class FavoriteView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      open: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.fetcher = this.fetcher.bind(this);
  }

  handleToggle() {
    this.setState({
      open: !this.state.open,
    });
  }

  fetcher(data) {
    this.setState({
      data,
    })
    this.handleToggle();
  }

  render() {
    const actions = [
      <FlatButton
        label="Remove"
        primary
        onTouchTap={this.handleToggle}
      />,
      <FlatButton
        label="close"
        primary
        onTouchTap={this.handleToggle}
      />,
    ];
    return (
      <div>
      <div style={styles.root}>
        <GridList
          cellHeight={130}
          style={styles.gridList}
        >
          {this.props.favData.map(oneFav => (
            <GridTile
              // onClick={}
              key={oneFav.name}
              title={oneFav.name}
            >
              <img onClick={this.fetcher(oneFav)} src={oneFav.photos[0]} />
            </GridTile>
            ))}
        </GridList>
      </div>
      <div>
        <Dialog
          title={this.state.data.name}
          actions={actions}
          open={this.state.open}
          onRequestClose={this.handleToggle}
        >
          <p>Phone: {this.state.data.phone}</p>
          <p>Address: {this.state.data.address}</p>
          <p>Price: {this.state.data.price}</p>
          <p>Rating: {this.state.data.rating}</p>
        </Dialog>
      </div>
    </div>
    );
  }
}

FavoriteView.propTypes = {
  // oneFav: PropTypes.object,
  favData: PropTypes.array,
};

FavoriteView.defaultProps = {
  // oneFav: PropTypes.object,
  favData: PropTypes.array,
};

export default FavoriteView;
