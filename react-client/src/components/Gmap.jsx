import React from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Gmap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: { lat: 59.95, lng: 30.33 },
      zoom: 11,
    };
  }

  render() {
    return (
      <GoogleMapReact
        bootstrapURLKeys={{
          key: 'AIzaSyDnmvUixK2wGOc7EAhKtMosh1Td7GqKEl8',
        }}
        defaultCenter={this.state.center}
        defaultZoom={this.state.zoom}
      >
        <AnyReactComponent
          lat={59.955413}
          lng={30.337844}
          text={'Kreyser Avrora'}
        />
      </GoogleMapReact>
    );
  }
}

export default Gmap;
