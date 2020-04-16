import React from 'react';
import Iframe from 'react-iframe';
import './Poster/poster.css'

const Teste = (props) => {
  const poster_url = props.url;
  return (
    <div>
      <Iframe className="iframe"
        title="desktop-payment-page"
        src={poster_url}
        frameBorder="0"
        position="relative"
        height="625px"
        width="100%"
        allow="fullscreen"
      ></Iframe>
    </div>
  )
}

export default Teste;