import React, { useState, useEffect } from 'react';
import Display from '../components/Display/Display';
import { display_mock } from '../assets/mockData/displays';
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';

const DisplaysBuilder = () => {

    const [state, setDisplayState] = useState({
        isLoading: false,
        displays: display_mock
    });

    // useEffect(() => {
    //     axios
    //         .get("https://jsonplaceholder.typicode.com/todos/1")
    //         .then(response => setDisplayState({
    //             isLoading: false,
    //             displays: display_mock
    //         }));
    // }, []);


    var displays = state.displays.map(display => {
        return (
            <Display
                key={display.id}
                id={display.id}
                name={display.name}
                domain={display.domain}
                location={display.location}
                description={display.description}
                mainImageUrl={display.mainImageUrl}
                posters={display.posters}
            />
        );
    });

    if (!state.isLoading) {
        return <div>{displays}</div>
    } else {
        return <CircularProgress />
    }
}

export default DisplaysBuilder;