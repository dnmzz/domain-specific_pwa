import React, { useState, useEffect } from 'react';
import Display from '../components/Display/Display';
import { display_mock } from '../assets/mockData/displays';
import axios from "axios";

const DisplaysBuilder = () => {

    const [displayState, setDisplayState] = useState(display_mock);

    // useEffect(() => {
    //     axios
    //       .get("http://localhost:8081/landingPageDisplays/via-sacra")
    //       .then(response => setDisplayState(response.data.Displays));
    //   }, []);


    var displays = displayState.map(display => {
        return (
            <Display 
            key={display.id} 
            id={display.id} 
            name={display.name}
            domain={display.domain}
            location= {display.location}
            description={display.description} 
            mainImageUrl={display.mainImageUrl}
            posters={display.posters}
            />
        );
    });

    return <div>{displays}</div>
}

export default DisplaysBuilder;