import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../css/styles';
import { withGoogleMap, GoogleMap } from "react-google-maps";


const InitialMap = withGoogleMap(props => (
   <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  />
));

export default InitialMap;