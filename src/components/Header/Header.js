import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import NavAuth from '../NavAuth/NavAuth';
import Navigation from '../Navigation/Navigation';

function Header({ loggedIn, isLoading }) {
  const { pathname } = useLocation();

  return (
    <header className={`header ${pathname !== '/' ? '' : 'header_auth'}`}>
      <Link to='/' className='header__link'>
        <img
          className='header__logo'
          src={logo}
          alt='Логотип Movie Explorer'
        ></img>
      </Link>
      {isLoading ? '' : loggedIn ? <Navigation /> : <NavAuth />}
      {/* {!loggedIn && <NavAuth />} */}
      {/* {loggedIn && <Navigation />} */}
    </header>
  );
}

export default Header;
