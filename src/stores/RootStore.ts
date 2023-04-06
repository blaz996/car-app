import React, { createContext } from 'react';
import { ModelsStore } from './ModelsStore';
import { MakesStore } from './MakesStore';

export class RootStore {
  modelsStore: ModelsStore;
  makesStore: MakesStore;
  constructor() {
    this.modelsStore = new ModelsStore(this);
    this.makesStore = new MakesStore(this);
  }
}
