import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useVeichleStore } from '../common/hooks/useVeichleStore';
import { Navbar } from '../layouts/Navbar';
import { ModelsRoutes } from './ModelsRoutes';
import { MakesRoutes } from './MakesRoutes';
import { HomePage } from './HomePage';
export const AppRoutes = () => {
  const veichleStore = useVeichleStore();
  useEffect(() => {
    Promise.all([veichleStore.fetchModels(), veichleStore.fetchMakes()]);
  }, []);
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
/*
        <Route path='/form' element={<VeichleModelForm />} />*/
