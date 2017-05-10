import React from 'react';
import { GridList, GridTile } from 'material-ui/GridList';

import styles from '../css/styles';

<<<<<<< HEAD

const List = (props) => (
=======
const List = props => (
>>>>>>> Fixed logic for quicker load
  <div style={styles.root}>
    <GridList style={styles.gridList2} cols={2.2}>
      {props.data.photos.map(picture => (
        <GridTile
          key={picture}
        >
          <img src={picture} alt="picture" />
        </GridTile>
      ))}
    </GridList>
  </div>
);


export default List;
