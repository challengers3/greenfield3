import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';
import styles from '../css/styles';


const List = props => (
  <div style={styles.List}>
    <GridList style={styles.gridList} cols={2.2}>
      {props.data.photos.map(tile => (
        <GridTile
          key={tile}
        >
          <img src={tile} alt="place" />
        </GridTile>
      ))}
    </GridList>
  </div>
);


export default List;

// unused component in current state
