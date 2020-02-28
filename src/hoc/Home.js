import React, { useState } from 'react';
import Aux from '../auxiliar/Aux';
import NavBar from '../components/Layout/Navbar';

const Home = (props) => {
    return (
        <Aux>
            <NavBar />
            {/* <div>
                {props.children}
            </div> */}
        </Aux>
    )
}

export default Home;