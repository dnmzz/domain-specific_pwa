import React, { useState, useEffect, useRef } from "react";
import { withGoogleMap, withScriptjs, GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { useHistory } from "react-router-dom";
import useBoundingclientrect from "@rooks/use-boundingclientrect";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import './map.css';


const useStyles = makeStyles((theme) => ({
    button: {
      margin: theme.spacing(1),
    },
  }));

const Map = (props) => {
    const [selectedDisplay, setselectedDisplay] = useState(null);
    let displays_array = props.displays;
    const classes = useStyles();

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

    const history = useHistory();
    const refContainer = useRef(null);
    const getBoundingClientRect = useBoundingclientrect(refContainer);

    const navToDisplay = (selectedDisplay) => {
        const { top, right, bottom, left, width, height } = getBoundingClientRect;
        history.push({
            pathname: `/display/${selectedDisplay._id}`,
            state: {
                to: 'modal',
                meta: {
                    from: { top, right, bottom, left, width, height }
                },
                data: {
                    id: selectedDisplay._id,
                    name: selectedDisplay.name,
                    domain: selectedDisplay.domain,
                    location: selectedDisplay.location,
                    description: selectedDisplay.description,
                    mainImageUrl: selectedDisplay.mainImageUrl,
                    posters: selectedDisplay.posters
                }
            },
        });
    }

    return (
        <div ref={refContainer}>
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
                        <div className="infoPopup">
                            <h2>{selectedDisplay.name}</h2>
                            <p>{selectedDisplay.location}</p>
                            <Button onClick={() => navToDisplay(selectedDisplay)} variant="outlined" size="small" color="primary" className={classes.margin}>
                                    Ir para o display
                            </Button>
                            {/* <h3 onClick={() => navToDisplay(selectedDisplay)}>Go to Display</h3> */}
                        </div>
                    </InfoWindow>
                )}
            </GoogleMap>
        </div>
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