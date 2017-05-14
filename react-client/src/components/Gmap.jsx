import React from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';

const Popup = ({ text }) => <div>{text}</div>;

class Gmap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultCenter: {
        lat: null,
        lng: null,
      },
      zoom: 11,
    };
  }

  // This is working, we need to give it the right lat and lng.
  // right now it is using the default location of the search
  // we need to update it dynamically on every searches

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
          text={this.props.name}
        />
      </GoogleMapReact>
    );
  }
}

Gmap.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  name: PropTypes.string,
};

Gmap.defaultProps = {
  lat: PropTypes.number,
  lng: PropTypes.number,
  name: PropTypes.string,
};

export default Gmap;
