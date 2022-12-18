import React, { CSSProperties } from 'react';
import brickwall from '../resources/images/brickwall_lightgray.png';

const headerStyle: CSSProperties = {
  textAlign: 'center',
  fontSize: 'calc(14px + 2vmin)',
  minHeight: '10vh',
  borderRadius: '0 0 25px 25px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: '0.8em',
  marginBottom: '1em',

  // Bacground logo
  backgroundImage: `url(${brickwall})`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: '300px',
  backgroundPosition: 'center',
}

const Header = () => {
  return (
    <div className={"row"} style={headerStyle}>
      <h1 className={"header"}>
        Insta wall organizer
      </h1>
    </div>
  )
}

export default Header;
