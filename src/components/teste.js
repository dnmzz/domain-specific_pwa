import React from 'react';
import { useHistory } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

function Teste(props) {

    let history = useHistory();

    const go = (props) => {
        history.push({
            pathname: '/home'
        });
    };
    return (
        <ArrowBackIcon onClick={() => go(props)} />
    );
}
export default Teste;

