import React, { createContext } from 'react';
import { ModelsStore } from './modelsStore';
import { MakesStore } from './makesStore';

export class RootStore {
  modelsStore: ModelsStore;
  makesStore: MakesStore;
  constructor() {
    this.modelsStore = new ModelsStore(this);
    this.makesStore = new MakesStore(this);
  }
}
