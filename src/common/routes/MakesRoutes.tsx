import React from 'react';

import { Routes, Route } from 'react-router-dom';
import { Makes } from '../../pages/Makes';
import { AddMake } from '../../pages/AddMake';
import { EditMake } from '../../pages/EditMake';

export const MakesRoutes = () => {
  return (
    <Routes>
      <Route index element={<Makes />} />
      <Route path='addMake' element={<AddMake />} />
      <Route path=':makeId/editMake' element={<EditMake />} />
    </Routes>
  );
};
