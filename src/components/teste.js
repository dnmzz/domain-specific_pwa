import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { display_mock } from '../assets/mockData/displays';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class Teste extends Component {
  static defaultProps = {
    center: {
      lat: 41.5497472,
      lng: -8.4286234
    },
    zoom: 15
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
          {display_mock.map(display => 
             <AnyReactComponent
             lat={display.lat}
             lng={display.long}
             text={display.name}
           />
          )}
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default Teste;