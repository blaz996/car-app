import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { GiCarWheel } from 'react-icons/gi';

import { Link } from 'react-router-dom';

import './Navbar.scss';

export const Navbar = () => {
  return (
    <>
      <nav className='navbar'>
        <div className='navbar__logo'>
          <GiCarWheel />
          <span>Veichle Center</span>
        </div>
        <ul className='navbar__links'>
          <li>
            <Link className='navbar__link' to='/models'>
              Models
            </Link>
          </li>
          <li>
            <Link className='navbar__link' to='/makes'>
              Makes
            </Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  );
};
