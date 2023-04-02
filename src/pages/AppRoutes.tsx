import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { useVeichleStore } from '../common/hooks/useVeichleStore';
import { Navbar } from '../layouts/Navbar';
import { ModelsRoutes } from './ModelsRoutes';
import { MakesRoutes } from './MakesRoutes';

export const AppRoutes = () => {
  const veichleStore = useVeichleStore();
  const { fetchMakes, fetchModels } = veichleStore;
  useEffect(() => {
    fetchMakes();
    fetchModels();
  }, []);

  return (
    <Routes>
      <Route element={<Navbar />}>
        <Route path='/models/*' element={<ModelsRoutes />} />
        <Route path='/makes/*' element={<MakesRoutes />} />
      </Route>
    </Routes>
  );
};
/*
        <Route path='/form' element={<VeichleModelForm />} />*/
