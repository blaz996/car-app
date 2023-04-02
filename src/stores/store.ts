import { Axios, AxiosResponse } from 'axios';
import { autorun, makeAutoObservable, toJS, runInAction } from 'mobx';
import { axios } from '../common/lib/axios';

import { SortValue } from '../common/types';
import { VeichleModelT, VeichleMakeT, FilterT } from '../common/types';

export interface VeichleMakeI {
  name: string;
  imageUrl: string;
  id: string;
}

type AddVeichleMake = Omit<VeichleMakeI, 'id'>;

export interface VeichleModelI extends VeichleMakeI {
  year: number;
  price: number;
  makeId: string;
  type: string;
}

type AddVeichleModel = Omit<VeichleModelI, 'id'>;

export class VeichleStore {
  public models: VeichleModelI[] = [];
  public currModel: VeichleModelI = {} as VeichleModelI;
  public currModelStatusIsLoading = false;
  public modelsStatus = 'idle';
  public makes: VeichleMakeI[] = [];
  public currMake: VeichleMakeI = {} as VeichleMakeI;
  public currMakeStatus = 'idle';
  public makesStatus = 'idle';
  public filters: FilterT[] = [];
  public sortValue: SortValue = {} as SortValue;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  getVeichleMakeId(makeName: string) {
    return this.makes.find((make) => make.name === makeName)!.id;
  }

  async fetchMakes() {
    this.makesStatus = 'loading';
    try {
      const { data } = await axios.get('/resources/VeichleMake');
      runInAction(() => {
        this.setMakes(data.item);
        this.makesStatus = 'success';
      });
    } catch (err) {
      console.log(err);
      this.makesStatus = 'error';
    }
  }

  setMakes(data: VeichleMakeI[]) {
    this.makes = data.map((make) => make);
  }

  getMakeNames() {
    return this.makes.map((make) => make.name);
  }

  getMakeName(makeId: string) {
    return this.makes.find((make) => make.id === makeId)!.name;
  }

  async fetchMake(id: string) {
    this.makesStatus = 'loading';
    try {
      const { data } = await axios.get(`/resources/VeichleMake/${id}`);
      console.log(data);
      runInAction(() => {
        this.setMake(data);
        this.makesStatus = 'success';
      });
    } catch (err) {
      console.log(err);
      this.makesStatus = 'error';
    }
  }

  setMake(data: VeichleMakeI) {
    this.currMake = data;
  }

  async addMake(make: AddVeichleMake) {
    const { data } = await axios.post<VeichleMakeI>(
      '/resources/VeichleMake',
      make
    );
    runInAction(() => {
      this.makes.push(data);
      this.makesStatus = 'success';
    });
  }

  getMakeIds() {
    return this.makes.map((make) => make.id);
  }

  async fetchModels() {
    try {
      this.modelsStatus = 'loading';
      const { data } = await axios.get('/resources/VeichleModel');
      runInAction(() => {
        this.setModels(data.item);
        this.modelsStatus = 'success';
      });
    } catch (err) {
      console.log(err);
      this.modelsStatus = 'error';
    }
  }

  getModelYears() {
    const modelYears = this.models.map((model) => model.year);
    return Array.from(new Set(modelYears));
  }

  setModels(data: VeichleModelI[]) {
    console.log(data);
    this.models = data.map((data) => data);
  }

  async fetchModel(id: string | undefined) {
    this.currModelStatusIsLoading = true;
    try {
      const { data } = await axios.get(`/resources/VeichleModel/${id}`);
      console.log(data);

      runInAction(() => {
        this.setModel(data);
        this.currModelStatusIsLoading = false;
      });
    } catch (err) {
      console.log(err);
      this.currModelStatusIsLoading = true;
    }
  }

  setModel(data: VeichleModelI) {
    this.currModel = data;
  }

  async applyModelEdit(modelId: string, editedModel: Partial<VeichleModelI>) {
    await axios.patch(`/resources/VeichleModel/${modelId}`, editedModel);
    runInAction(
      () =>
        (this.models = this.models.map((model) => {
          if (model.id === modelId) {
            return { ...model, ...editedModel };
          }
          return model;
        }))
    );
  }

  async applyMakeEdit(makeId: string, editedMake: any) {
    console.log(makeId);
    await axios.patch(`/resources/VeichleMake/${makeId}`, editedMake);
    runInAction(() => {
      this.makes = this.makes.map((make) => {
        if (make.id === makeId) {
          return { ...make, ...editedMake };
        }
        return make;
      });
    });
  }

  async addModel(model: AddVeichleModel) {
    const { data } = await axios.post<VeichleModelI>(
      '/resources/VeichleModel',
      {
        ...model,
      }
    );
    runInAction(() => {
      this.models.push(data);
    });
  }

  async removeModel(modelId: string) {
    await axios.delete(`/resources/VeichleModel/${modelId}`);
    runInAction(() => {
      this.models = this.models.filter((currModel) => currModel.id !== modelId);
    });
  }

  addFilter(currFilter: FilterT) {
    // IF THE CURRENT FILTER PROPERTY EXISTS REMOVE IT FIRST BEFORE ADDING THE NEW FILTER
    if (
      this.filters.find((filter) => filter.property === currFilter.property)
    ) {
      this.removeFilter(currFilter);
    }
    this.filters.push(currFilter);

    console.log(toJS(this.filters));
  }

  removeFilter(currFilter: FilterT) {
    this.filters = this.filters.filter(
      (filter) => filter.property !== currFilter.property
    );
    console.log(toJS(this.filters));
  }

  applyFilters() {
    if (this.filters.length === 0) return;
  }

  getMakes() {
    return this.makes.map((make) => make.name);
  }

  async deleteModels(makeId: string) {
    await Promise.all(
      this.models.map((model) => {
        if (model.makeId === makeId) {
          axios.delete(`/resources/VeichleModel/${model.id}`);
        }
      })
    );
    this.models = this.models.filter((model) => model.makeId !== makeId);
  }

  *editVeichle() {}

  async removeMake(id: string) {
    const response = await axios.delete(`/resources/VeichleMake/${id}`);
    console.log(response);
    runInAction(() => {
      this.makes = this.makes.filter((make) => make.id !== id);
    });
    this.deleteModels(id);
  }
}
