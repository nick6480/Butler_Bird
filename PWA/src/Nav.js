import React from 'react';

import {Link} from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar">
      <Link to="/settings">
        <div className="settings"><img src="./img/icon-settings.svg" alt="settings icon"></img></div>
      </Link>
      <Link to="/">
        <div className="hotel"><img src="./img/icon-home.svg" alt="home icon"></img></div>
      </Link>
      <Link to="/restaurants">
        <div className="restaurants"><img src="./img/icon-restaurant.svg" alt="home icon"></img></div>
      </Link>
      <Link to="/activities">
        <div className="activities"><img src="./img/icon-city.svg" alt="home icon"></img></div>
      </Link>
        <div className="search"><img src="./img/icon-search.svg" alt="home icon"></img></div>
    </nav>
  )
}


export default Nav
