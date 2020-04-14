import React, { useState, useEffect } from "react";
import { display_mock } from '../../assets/mockData/displays';
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from "react-google-maps";


const Map = () => {
    const [selectedDisplay, setselectedDisplay] = useState(null);

    useEffect(() => {
        const listener = e => {
            if (e.key === "Escape") {
                setselectedDisplay(null);
            }
        };
        window.addEventListener("keydown", listener);

        return () => {
            window.removeEventListener("keydown", listener);
        };
    }, []);

    return (
        <GoogleMap
            defaultZoom={16.5}
            defaultCenter={{ lat: 41.5497472, lng: -8.4286234 }}
        >
            {display_mock.map(park => (
                <Marker
                    key={park.id}
                    position={{
                        lat: park.lat,
                        lng: park.long
                    }}
                    onClick={() => {
                        setselectedDisplay(park);
                    }}
                    icon={{
                        url: park.icon,
                        scaledSize: new window.google.maps.Size(25, 25)
                    }}
                />
            ))}

            {selectedDisplay && (
                <InfoWindow
                    onCloseClick={() => {
                        setselectedDisplay(null);
                    }}
                    position={{
                        lat: selectedDisplay.lat,
                        lng: selectedDisplay.long
                    }}
                >
                    <div>
                        <h2>{selectedDisplay.name}</h2>
                        <p>{selectedDisplay.location}</p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
}

const MapWrapped = withScriptjs(withGoogleMap(Map));

export default function MapView() {
    return (
        <div style={{ height: "100vh" }}>
            <MapWrapped
                googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDENqC63QMxNsE3yGA-Wxi_gA_SrkmaIZQ'}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    );
}