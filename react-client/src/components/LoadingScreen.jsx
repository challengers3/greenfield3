import React from 'react';
import Loading from 'material-ui/CircularProgress';
import styles from '../css/styles';

const LoadingScreen = () => (
  <Loading
    size={80} thickness={5}
    color={styles.mainColor}
    style={styles.centeredImage}
  />
);

export default LoadingScreen;

// this component is here in case a loading screen needed
// due to improve in performane, this loading screen might not be seen at all
