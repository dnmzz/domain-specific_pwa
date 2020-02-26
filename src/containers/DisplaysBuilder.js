import React, { useState } from 'react';
import Display from '../components/Display/Display';
import { display } from '../display_mockData'





const DisplaysBuilder = () => {

    const [displayState, setDisplayState] = useState(display);


    displayState.map((display, index) => {
        return <Display name={display[index].name} />
    })
}

export default DisplaysBuilder;