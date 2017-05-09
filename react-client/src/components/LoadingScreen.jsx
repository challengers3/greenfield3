import React from 'react';
import Loading from 'material-ui/CircularProgress';
import styles from '../css/styles';

const LoadingScreen = () => (
  <div>
    <Loading
      size={80} thickness={5}
      color={styles.mainColor}
      style={styles.centeredImage}
    />
  </div>
);

export default LoadingScreen;
