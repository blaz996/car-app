import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { Navbar } from '../../layouts/Navbar';
import { ModelsRoutes } from './ModelsRoutes';
import { MakesRoutes } from './MakesRoutes';
import { HomePage } from '../../pages/HomePage';
export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route index element={<HomePage />} />
        <Route path='/models/*' element={<ModelsRoutes />} />
        <Route path='/makes/*' element={<MakesRoutes />} />
      </Route>
    </Routes>
  );
};
