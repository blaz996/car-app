import React, { useState } from 'react';

import { useVeichleStore } from '../../common/hooks/useVeichleStore';
import { VeichleMakeI } from '../../stores/store';
import { MakeForm } from './MakeForm';

export const AddMake = () => {
  const { addMake } = useVeichleStore();
  const initialState = {
    name: '',
    imageUrl: '',
  };
  const addMakeSubmit = (make: Omit<VeichleMakeI, 'id'>) => {
    addMake(make);
  };
  return <MakeForm onSubmit={addMakeSubmit} initialState={initialState} />;
};
