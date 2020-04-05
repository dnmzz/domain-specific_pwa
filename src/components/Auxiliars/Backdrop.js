import React, { useState, useEffect } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}));

const Backdrops = () => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    return (
        <div>
            <Backdrop className={classes.backdrop} open={!open}>
                <CircularProgress color="secondary" />
            </Backdrop>
        </div>
    )
};

export default Backdrops;