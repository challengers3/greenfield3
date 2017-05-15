import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import PropTypes from 'prop-types';

import FavInfo from './FavInfo';
import styles from '../css/styles';

class FavoriteView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.favData[0],
    };
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(data) {
    this.setState({
      data,
    }, () => this.props.speechRemoveHandler(this.state.data));
  }

  render() {
    return (
      <div style={styles.root}>
        <GridList
          cellHeight={130}
          style={styles.gridList}
        >
          {this.props.favData.map(oneFav => (
            <GridTile
              key={oneFav._id}
              title={oneFav.name}
            >
              <img
                onTouchTap={() => this.clickHandler(oneFav)}
                src={oneFav.photos[0]}
                alt="one favorite"
              />
            </GridTile>
            ))}
        </GridList>
        <FavInfo
          onRemove={this.props.onRemove}
          data={this.state.data}
        />
      </div>
    );
  }
}


FavoriteView.propTypes = {
  favData: PropTypes.array,
  onRemove: PropTypes.func,
  speechRemoveHandler: PropTypes.func,
};

FavoriteView.defaultProps = {
  favData: PropTypes.array,
  onRemove: PropTypes.func,
  speechRemoveHandler: PropTypes.func,
};


export default FavoriteView;
