import React, { useState, Dispatch, SetStateAction } from 'react';
import { useVeichleStore } from '../../common/hooks/useVeichleStore';
import { VeichleModelI } from '../../stores/store';
import { ModelFormState } from './ModelForm';

import { ModelForm } from './ModelForm';

export const AddModel = () => {
  const initalState = {
    imageUrl: '',
    modelMake: '',
    name: '',
    year: '',
    price: '',
    type: '',
  };

  const { getVeichleMakeId, addModel } = useVeichleStore();

  const addModelSubmit = (model: Omit<VeichleModelI, 'id'>) => {
    addModel(model);
  };

  return <ModelForm initalState={initalState} onSubmit={addModelSubmit} />;
};
