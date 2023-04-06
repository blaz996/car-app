import React, { useContext } from 'react';
import { StoreContext } from '../context/RootStoreContext';
export const useRootStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useRootStore must be used within RootStoreProvider');
  }

  return context;
};
