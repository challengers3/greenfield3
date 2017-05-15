import React from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import styles from '../css/styles';

const pin = require('../assets/pin/pin.png');

const Popup = ({ text }) => (
  <div>
    <img
      style={styles.marker}
      src={pin} alt="pin"
    />
    {text}
  </div>
);


class Gmap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultCenter: {
        lat: 0,
        lng: 0,
      },
      zoom: 17,
    };
  }

  render() {
    const center = {
      lat: this.props.lat,
      lng: this.props.lng,
    };
    return (
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyDnmvUixK2wGOc7EAhKtMosh1Td7GqKEl8',
        }}
        defaultCenter={this.state.defaultCenter}
        center={center}
        defaultZoom={this.state.zoom}
      >
        <Popup
          lat={center.lat}
          lng={center.lng}
          text={this.props.data.name}
        />
      </GoogleMapReact>
    );
  }
}

Gmap.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  data: PropTypes.obj,
};

Gmap.defaultProps = {
  lat: 0,
  lng: 0,
  data: PropTypes.obj,
};

export default Gmap;
