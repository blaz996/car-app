import React, { createContext } from 'react';
import { VeichleStore } from '../../stores/store';

export const VeichleContext = createContext<VeichleStore | null>(null);
const veichleStore = new VeichleStore();
export const VeichleProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <VeichleContext.Provider value={veichleStore}>
      {children}
    </VeichleContext.Provider>
  );
};
