import React, { useState, useEffect } from 'react';
import Display from '../components/Display/Display';
import { display_mock } from '../assets/mockData/displays';
import Backdrops from '../components/Auxiliars/Backdrop';
import { getDisplaysByContext } from '../services/DisplaysAPI';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import GoogleMap from '../components/Google/Map';

const DisplaysBuilder = () => {
    const [state, setDisplayState] = useState({
        isLoading: true,
        displays: [],
        checked: false
    });

    const domain_id = '5e9491052729a400048e7928';

    const handleChange = (event) => {
        setDisplayState({ ...state, checked: !state.checked });
    };

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
        <FormGroup>
            <FormControlLabel className="switch"
                control={<Switch onChange={handleChange} name="checked" size="medium"/>}
                label="MAP VIEW"
            />
            {state.checked ?
                <div>
                    {state.displays.length > 0 ?
                        <div> <GoogleMap disp={state.displays} /> </div>
                        :
                        <div>
                            <Backdrops />
                        </div>
                    }
                </div>
                :
                <div>
                    {state.displays.length > 0 ?
                        <div>
                            {displays}
                        </div>
                        :
                        <div>
                            <Backdrops />
                        </div>
                    }
                </div>
            }
        </FormGroup>
    </div>
}

export default DisplaysBuilder;