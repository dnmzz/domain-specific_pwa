import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class Teste extends Component {
  static defaultProps = {
    center: {
      lat: 41.447111,
      lng: -8.292756
    },
    zoom: 30
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyDENqC63QMxNsE3yGA-Wxi_gA_SrkmaIZQ"}}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={41.447111}
            lng={-8.292756}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default Teste;