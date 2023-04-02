import React from 'react';

import { Routes, Route } from 'react-router-dom';
import { Makes } from '../components/VeichleMakes/Makes';
import { AddMake } from '../components/VeichleMakes/AddMake';
import { EditMake } from '../components/VeichleMakes/EditMake';

export const MakesRoutes = () => {
  return (
    <Routes>
      <Route index element={<Makes />} />
      <Route path='addMake' element={<AddMake />} />
      <Route path=':makeId/editMake' element={<EditMake />} />
    </Routes>
  );
};
