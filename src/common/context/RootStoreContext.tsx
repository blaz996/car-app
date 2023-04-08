import React, { createContext } from 'react';
import { RootStore } from '../../stores/rootStore';
let store: RootStore;

// create the context
export const StoreContext = createContext<RootStore | undefined>(undefined);

// create the provider component
export function RootStoreProvider({ children }: { children: React.ReactNode }) {
  //only create the store once ( store is a singleton)
  const root = store ?? new RootStore();

  return <StoreContext.Provider value={root}>{children}</StoreContext.Provider>;
}
