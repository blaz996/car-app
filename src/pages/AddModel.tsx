import React, { useState, Dispatch, SetStateAction } from 'react';

import { useRootStore } from '../common/hooks/useRootStore';
import { VeichleModelI } from '../stores/modelsStore';

import { ModelForm } from '../components/VeichleModel/ModelForm';

export const AddModel = () => {
  const initalState = {
    imageUrl: '',
    modelMake: '',
    name: '',
    year: '',
    price: '',
    type: 'Sedan',
  };

  const { modelsStore } = useRootStore();

  const addModelSubmit = (model: Omit<VeichleModelI, 'id'>) => {
    modelsStore.createModel(model);
  };

  return <ModelForm initalState={initalState} onSubmit={addModelSubmit} />;
};
