import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Button } from '../components/Elements/Button';

import { Navbar } from '../layouts/Navbar';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/' element={<Navbar />}></Route>
    </Routes>
  );
};
