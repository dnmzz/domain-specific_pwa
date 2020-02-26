import React, { useState, useEffect } from 'react';
import Display from '../components/Display/Display';
import { display } from '../display_mockData';
import NavBar from '../components/NavBar';
import axios from "axios";

const DisplaysBuilder = () => {

    const [displayState, setDisplayState] = useState(display);

    // useEffect(() => {
    //     axios
    //       .get("https://jsonplaceholder.typicode.com/users")
    //       .then(response => setDisplayState(response.data));
    //   }, []);


    var displays = displayState.map(display => {
        return (
            <Display name={display.name} />
        );
    });

    return <div>
        {/* <NavBar /> */}
        {displays}
    </div>

    // return (<Display name={displayState[0].name} />)
    // displayState.map((display, index) => {
    //     return <Display name={display[index].id} />
    // })
}

export default DisplaysBuilder;