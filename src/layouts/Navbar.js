import React from 'react';
import { Outlet } from 'react-router-dom';
import { GiCarWheel } from 'react-icons/gi';
import { friendsStore, grid1 } from '../stores/store';
import VeichleForm from '../components/VeichleForm';
import './Navbar.scss';

export const Navbar = () => {
  return (
    <>
      <nav className='navbar'>
        <div className='navbar__logo'>
          <GiCarWheel />
          <span>Cars</span>
        </div>
      </nav>

      <VeichleForm />

      <Outlet />
    </>
  );
};
