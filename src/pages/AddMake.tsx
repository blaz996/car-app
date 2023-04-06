import React, { useState } from 'react';

import { useRootStore } from '../common/hooks/useRootStore';
import { VeichleMakeI } from '../stores/MakesStore';
import { MakeForm } from '../components/VeichleMakes/MakeForm';

export const AddMake = () => {
  const { makesStore } = useRootStore();
  const initialState = {
    name: '',
    imageUrl: '',
  };
  const addMakeSubmit = (make: Omit<VeichleMakeI, 'id'>) => {
    makesStore.createMake(make);
  };
  return <MakeForm onSubmit={addMakeSubmit} initialState={initialState} />;
};
