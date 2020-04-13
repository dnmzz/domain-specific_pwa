import React, { useState, useEffect } from 'react';
import Display from '../components/Display/Display';
import { display_mock } from '../assets/mockData/displays';
import Backdrops from '../components/Auxiliars/Backdrop';
import { getDisplaysByContext } from '../services/DisplaysAPI';

const DisplaysBuilder = () => {
    const [state, setDisplayState] = useState({
        isLoading: true,
        displays: []
    });

    const domain_id = '5e9491052729a400048e7928';

    useEffect(() => {
        getDisplaysByContext(domain_id)
            .then(response => setDisplayState({
                isLoading: false,
                displays: response.data.Displays
            }));
    }, []);


    var displays = state.displays.map(display => {
        return (
            <Display
                key={display._id}
                id={display._id}
                name={display.name}
                domain={display.domain}
                location={display.location}
                description={display.description}
                mainImageUrl={display.mainImageUrl}
                posters={display.posters}
            />
        );
    });

    return <div>
        {state.displays.length > 0 ?
            <div>
                {displays}
            </div>
            :
            <div>
                <Backdrops />
            </div>}
    </div>
}

export default DisplaysBuilder;