import React from 'react'
import { Link } from 'react-router-dom';

import logo from './../../../images/tmplogo.png';
import './Header.css';


function MiddleHeaderLogo() {

  return (
    <Link to="/home">
      <img className='logo-center' src={logo} alt='logo' />
    </Link>
  )
}


export default MiddleHeaderLogo;