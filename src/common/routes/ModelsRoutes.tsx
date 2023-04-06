import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Models } from '../../pages/Models';
import { ModelDetail } from '../../pages/ModelDetail';
import { AddModel } from '../../pages/AddModel';
import { EditModel } from '../../pages/EditModel';

export const ModelsRoutes = () => {
  return (
    <Routes>
      <Route index element={<Models />} />
      <Route path=':modelId' element={<ModelDetail />} />
      <Route path='addModel' element={<AddModel />} />
      <Route path=':modelId/editModel' element={<EditModel />} />
    </Routes>
  );
};
