import React, { useState, useEffect } from 'react';
import Display from '../components/Display/Display';
import { display_mock } from '../assets/mockData/displays';
import axios from "axios";

const DisplaysBuilder = () => {

    const [displayState, setDisplayState] = useState(display_mock);

    // useEffect(() => {
    //     axios
    //       .get("https://jsonplaceholder.typicode.com/users")
    //       .then(response => setDisplayState(response.data));
    //   }, []);


    var displays = displayState.map(display => {
        return (
            <Display key={display.id} name={display.name} description={display.description} mainImageUrl={display.mainImageUrl}/>
        );
    });

    return <div>{ displays} </div>

    // return (<Display name={displayState[0].name} />)
    // displayState.map((display, index) => {
    //     return <Display name={display[index].id} />
    // })
}

export default DisplaysBuilder;