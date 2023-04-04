import { Axios, AxiosResponse } from 'axios';
import {
  autorun,
  makeAutoObservable,
  toJS,
  runInAction,
  observable,
} from 'mobx';
import { convertTypeAcquisitionFromJson } from 'typescript';
import { axios } from '../common/lib/axios';

import { SortValue } from '../common/types';

import { ToggleFilter, RangeFilter } from '../common/utils/Filter';
import { SortI, Sort } from '../common/utils/Sort';

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
  public filters: (ToggleFilter | RangeFilter)[] = [];
  public sortValue: Sort = new Sort('year', false, 'Year (Latest)');
  public yearFilters: number[] = [];
  public currPage: number = 1;
  public nextPageexists: boolean = false;
  public prevPageExists: boolean = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  getVeichleMakeId(makeName: string) {
    return this.makes.find((make) => make.name === makeName)!.id;
  }

  checkNextAndPrevPage(totalRecords: number) {
    this.nextPageexists =
      this.currPage + 1 > Math.ceil(totalRecords / 10) ? false : true;
    this.prevPageExists = this.currPage - 1 === 0 ? false : true;
  }

  nextPage() {
    if (this.nextPageexists) {
      this.currPage += 1;
    } else return;
  }

  previousPage() {
    if (this.prevPageExists) {
      this.currPage -= 1;
    } else {
      return;
    }
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

  addSortValue(sort: Sort) {
    this.sortValue = sort;
  }

  setYearFilters() {
    const years = this.models.map((model) => model.year);
    this.yearFilters = Array.from(new Set(years));
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
      if (this.filters.length !== 0) {
        this.currPage = 1;
      }
      const { data } = await axios.get(
        `/resources/VeichleModel/?sort=${this.sortValue.applySort()}${this.applyFilters()}&page=${
          this.currPage
        }`
      );
      console.log(data);

      runInAction(() => {
        this.checkNextAndPrevPage(data.totalRecords);
        this.setModels(data.item);
        this.modelsStatus = 'success';
      });
    } catch (err) {
      console.log(err);
      this.modelsStatus = 'error';
    }
  }

  setModels(data: VeichleModelI[]) {
    const prices = this.models.map((model) => model.price);
    console.log(Math.max(...prices));
    this.models = data.map((data) => {
      return data;
    });
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

  toggleFilter(currFilter: ToggleFilter | RangeFilter) {
    if (
      this.filters.find((filter) => filter.property === currFilter.property)
    ) {
      this.removeFilter(currFilter.property);
      console.log('REMOVED');
    }
    this.addFilter(currFilter);
  }

  addFilter(currFilter: ToggleFilter | RangeFilter) {
    this.filters = [...this.filters, currFilter];
  }

  removeFilter(property: string) {
    this.filters = this.filters.filter(
      (filter) => filter.property !== property
    );
    console.log(toJS(this.filters));
  }

  applyFilters() {
    if (this.filters.length === 0) return '';
    let filterString = '&searchQuery=';
    this.filters.forEach((filter, i) => {
      if (i === 0) {
        filterString += `WHERE ${filter.applyFilter()}`;
      } else {
        filterString += ` AND ${filter.applyFilter()}`;
      }
    });
    console.log(filterString);
    return filterString;
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
