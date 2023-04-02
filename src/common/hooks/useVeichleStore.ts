import React, { useContext } from 'react';
import { VeichleContext } from '../context/VeichleContext';

export const useVeichleStore = () => {
  const veichleStore = useContext(VeichleContext);

  if (!veichleStore) {
    throw new Error('No context');
  }

  return veichleStore;
};
