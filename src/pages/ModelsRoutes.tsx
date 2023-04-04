import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Models } from '../components/VeichleModel/Models';
import { ModelDetail } from '../components/VeichleModel/ModelDetail';
import { AddModel } from '../components/VeichleModel/AddModel';
import { EditModel } from '../components/VeichleModel/EditModel';

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
