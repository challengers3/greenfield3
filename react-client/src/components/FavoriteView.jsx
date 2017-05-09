import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import Subheader from 'material-ui/Subheader';
import PropTypes from 'prop-types';

import styles from '../css/styles';

const FavoriteView = props => (
  <div style={styles.root}>
    <GridList
      cellHeight={180}
      style={styles.gridList}
    >
      <Subheader>Favorites</Subheader>
      {props.data.map(oneFav => (
        <GridTile
          key={oneFav.name}
          title={oneFav.name}
        >
          <img src={oneFav.photos[0]} />
        </GridTile>
        ))}
    </GridList>
  </div>
);

FavoriteView.propTypes = {
  data: PropTypes.object,
};

FavoriteView.defaultProps = {
  data: PropTypes.func,
};


export default FavoriteView;
