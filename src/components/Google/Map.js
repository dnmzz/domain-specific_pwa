import React, { useState, useEffect } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from "react-google-maps";


const Map = (props) => {
    const [selectedDisplay, setselectedDisplay] = useState(null);
    let displays_array = props.displays;

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
            defaultZoom={15.5}
            defaultCenter={{ lat: 41.5444, lng: -8.4269 }}
        >
            {displays_array.map(display => (
                <Marker
                    key={display._id}
                    position={{
                        lat: display.lat,
                        lng: display.long
                    }}
                    onClick={() => {
                        setselectedDisplay(display);
                    }}
                    icon={{
                        url: display.icon,
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

export default function MapView(props) {
    return (
        <div style={{ height: "100vh" }}>
            <MapWrapped
                displays={props.disp}
                googleMapURL={'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDENqC63QMxNsE3yGA-Wxi_gA_SrkmaIZQ'}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
        </div>
    );
}