import React from 'react';
import styles from '../css/styles';

const HelpSection = () => (
  <div style={styles.centeredImage}>
    <h1>Possible Commands</h1>
    <p>Say &quot;Show me *&quot;: To start your search</p>
    <p>Say &quot;Save to Favorites&quot;: To save</p>
    <p>Say &quot;Remove from Favorites&quot;: To remove current selection</p>
    <p>Say &quot;Go to Favorites&quot;: to see your favorite places</p>
    <p>Say &quot;Go to Front Page&quot;: to go to the main page</p>
  </div>
);

export default HelpSection;
