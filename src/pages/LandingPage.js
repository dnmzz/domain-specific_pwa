import React from 'react';
import { useHistory } from "react-router-dom";
import Typical from 'react-typical'
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import FavoriteIcon from '@material-ui/icons/Favorite';
import NavigationIcon from '@material-ui/icons/Navigation';

import './landingPage.css';

function LandingPage(props) {
    const useStyles = makeStyles((theme) => ({
        root: {
            '& > *': {
                margin: theme.spacing(1),
            },
        },
        extendedIcon: {
            marginRight: theme.spacing(1),
        },
    }));
    const classes = useStyles();

    let history = useHistory();

    const go = (props) => {
        history.push({
            pathname: '/home'
        });
    };
    return (

        <div className={classes.root}>
            <div className="landingPage-entryText">
                <Typical
                    steps={['A SIMPLE WAY', 1000, 'A SIMPLE TO INTERACT WITH DISPLAY.', 500]}
                    loop={Infinity}
                    wrapper="h1"
                />
            </div>
            <div className="landingPage-startBtn">
                <Fab onClick={() => go(props)} variant="extended">
                    <NavigationIcon className={classes.extendedIcon} />
                        GET STARTED
                </Fab>
            </div>
        </div>
    );
}

export default LandingPage;