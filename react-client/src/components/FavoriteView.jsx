import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import PropTypes from 'prop-types';

import styles from '../css/styles';

const FavoriteView = props => (
  <div style={styles.root}>
    <GridList
      cellHeight={130}
      style={styles.gridList}
    >
      {props.favData.map(oneFav => (
        <GridTile
          cols={3}
          // onClick={}
          key={oneFav.name}
          title={oneFav.name}
        >
          <img src={oneFav.photos[0]} />
        </GridTile>
        ))}
    </GridList>
    {/* <p>Price: {oneFav.price}</p>
    <p>Name: {oneFav.name}</p>
    <p>Phone: {oneFav.phone}</p>
    <a href={oneFav.url}>Link</a>
    <p>Website: {oneFav.url}</p> */}
  </div>
);

FavoriteView.propTypes = {
  favData: PropTypes.array,
};

FavoriteView.defaultProps = {
  favData: PropTypes.array,
};


export default FavoriteView;
