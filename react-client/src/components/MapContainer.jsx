import React from 'react';
import ReactDOM from 'react-dom';
import styles from '../css/styles';
import InitialMap from './InitialMap.jsx'
import { withGoogleMap, GoogleMap } from "react-google-maps";


class MapContainer extends React.Component {
  render() {
    return (
      <InitialMap
        containerElement={
          <div style={{ height: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
      />
    )
  }
}

export default MapContainer;