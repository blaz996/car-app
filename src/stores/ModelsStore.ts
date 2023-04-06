import { RootStore } from './RootStore';

import { makeAutoObservable } from 'mobx';

import { ModelsApiService } from './services/ApiServices';
import { FilterMenuStore } from './FilterMenuStore';

import { Sort } from '../common/utils/sort';

import { runInAction } from 'mobx';

import { VeichleMakeI } from './MakesStore';
import { Filter } from '../common/utils/filter';
import { axios } from '../common/lib/axios';

export type VeichleModelI = {
  name: string;
  imageUrl: string;
  makeId: string;
  year: number;
  price: number;
  type: string;
  id: string;
};

export class ModelsStore {
  rootStote: RootStore;
  constructor(rootStote: RootStore) {
    this.rootStote = rootStote;
    makeAutoObservable(this, {}, { autoBind: true });
  }
  models: VeichleModelI[] = [];
  modelsStatus: string = 'idle';
  model: VeichleModelI = {} as VeichleModelI;
  currModelMakeName: string = '';
  modelStatus: string = 'idle';
  isDeleting: boolean = false;
  makesFilters: VeichleMakeI[] = [];
  filters: Filter[] = [];
  sortValue: Sort = new Sort('year', false, 'Year (Latest)');
  currentPage: number = 1;
  totalRecords: number = 1;

  filterMenuStore = new FilterMenuStore();
  apiService: ModelsApiService = new ModelsApiService();

  async fetchModels(rpp: number = 10) {
    this.modelsStatus = 'loading';

    try {
      const { data } = await this.apiService.getModels(
        this.applyFilters(),
        this.sortValue.applySort(),
        this.currentPage,
        rpp
      );
      runInAction(() => {
        this.totalRecords = data.totalRecords;
        this.models = data.item;
        this.modelsStatus = 'success';
      });
    } catch (err) {
      this.modelsStatus = 'error';
    }
  }

  async fetchModel(id: string, makeId: string) {
    this.modelStatus = 'loading';
    try {
      const { data } = await this.apiService.getModel(id);
      const makeName = await this.rootStote.makesStore.fetchMakeName(makeId);

      runInAction(() => {
        this.model = data;
        this.currModelMakeName = makeName;
        this.modelStatus = 'success';
      });
    } catch (err) {
      this.modelStatus = 'error';
    }
  }

  async createModel(model: Omit<VeichleModelI, 'id'>) {
    try {
      const { data } = await this.apiService.add(model);

      runInAction(() => {
        this.models = [...this.models, data];
      });
    } catch (err) {}
  }

  async editModel(id: string, editedModel: Partial<VeichleModelI>) {
    try {
      await this.apiService.edit(id, editedModel);
      runInAction(() => {
        this.models = this.models.map((model) => {
          if (model.id === id) {
            return { ...model, ...editedModel };
          }
          return model;
        });
      });
    } catch (err) {}
  }

  async deleteModel(id: string) {
    this.isDeleting = true;
    try {
      await this.apiService.delete(id);
      runInAction(() => {
        this.models = this.models.filter((model) => model.id !== id);
        this.isDeleting = false;
        if (this.pageEmpty(this.models)) {
          this.handleEmptyPage();
        }
      });
    } catch (err) {}
  }

  async deleteAllModelsForMake(makeId: string) {
    const { data } = await this.apiService.getModels(
      `&searchQuery=WHERE "makeId" = '${makeId}'`,
      this.sortValue.applySort(),
      1,
      50
    );

    await Promise.all(
      data.item.map((data: VeichleModelI) => {
        this.deleteModel(data.id);
      })
    );
  }

  async setMakesFilters() {
    const { data } = await axios.get(`/resources/VeichleMake/?rpp=100`);
    runInAction(
      () =>
        (this.makesFilters = data.item.sort(
          (a: VeichleMakeI, b: VeichleMakeI) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        ))
    );
  }

  handleEmptyPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
    }
    this.fetchModels();
  }

  toggleFilter(currFilter: Filter) {
    if (
      this.filters.find((filter) => filter.property === currFilter.property)
    ) {
      this.removeFilter(currFilter.property);
    }
    this.addFilter(currFilter);
    this.filterMenuStore.close();
    this.currentPage = 1;
    this.fetchModels();
  }

  addFilter(currFilter: Filter) {
    this.filters = [...this.filters, currFilter];
  }

  removeFilter(property: string, refetch: boolean = false) {
    this.currentPage = 1;
    this.filters = this.filters.filter(
      (filter) => filter.property !== property
    );

    if (refetch) {
      this.currentPage = 1;
      this.fetchModels();
    }
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

    return filterString;
  }

  addSortValue(sortV: Sort) {
    this.sortValue = sortV;
    this.currentPage = 1;
    this.fetchModels();
    this.filterMenuStore.close();
  }

  clearFilters() {
    this.filters = [];
  }

  nextPageExists() {
    return this.currentPage + 1 > Math.ceil(this.totalRecords / 10)
      ? false
      : true;
  }

  previousPageExists() {
    return this.currentPage - 1 === 0 ? false : true;
  }

  nextPage() {
    if (this.nextPageExists()) {
      this.currentPage += 1;
      this.fetchModels();
    } else return;
  }

  previousPage() {
    if (this.previousPageExists()) {
      this.currentPage -= 1;
      this.fetchModels();
    } else {
      return;
    }
  }

  resetCurrentPage() {
    this.currentPage = 1;
  }

  pageEmpty(records: any[]) {
    return records.length === 0 ? true : false;
  }
}
