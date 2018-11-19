import React from 'react';
import { Header } from 'semantic-ui-react';

import { Link } from 'react-router-dom';


const HeaderApp = () => {
  return (
    <Header>
      <ul>
      	<li><Link to='/register'>Register</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/movies">Movies</Link></li>
      </ul>
    </Header>
    )
}

export default HeaderApp;
