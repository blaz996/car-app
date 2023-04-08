import { RootStore } from './rootStore';

import { makeAutoObservable } from 'mobx';

import { ModelsApiService } from './services/apiServices';

import { Sort } from '../common/utils/sort';

import { runInAction } from 'mobx';
import { FiltersService } from './services/filtersService';
import { PaginationService } from './services/paginationService';

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
  model: VeichleModelI =
    JSON.parse(localStorage.getItem('currModel') || '{}') ||
    ({} as VeichleModelI);
  currModelMakeName: string =
    JSON.parse(localStorage.getItem('currModelMakeName') || '{}') || '';
  modelStatus: string = 'idle';
  isDeleting: boolean = false;

  filtersService = new FiltersService(new Sort('year', false, 'Year (Latest)'));
  paginationService = new PaginationService();
  apiService: ModelsApiService = new ModelsApiService();

  async fetchModels(rpp: number = 10) {
    this.modelsStatus = 'loading';

    try {
      const { data } = await this.apiService.getModels(
        this.filtersService.applyFilters(),
        this.filtersService.applySort(),
        this.paginationService.currentPage,
        rpp
      );
      runInAction(() => {
        this.paginationService.totalRecords = data.totalRecords;
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
        window.localStorage.setItem('currModel', JSON.stringify(data));
        window.localStorage.setItem(
          'currModelMakeName',
          JSON.stringify(makeName)
        );
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
        if (this.paginationService.pageEmpty(this.models)) {
          this.handleEmptyPage();
        }
      });
    } catch (err) {}
  }

  async deleteAllModelsForMake(makeId: string) {
    const { data } = await this.apiService.getModels(
      `&searchQuery=WHERE "makeId" = '${makeId}'`,
      this.filtersService.applySort(),
      1,
      50
    );

    await Promise.all(
      data.item.map((data: VeichleModelI) => {
        this.deleteModel(data.id);
      })
    );
  }

  handleEmptyPage() {
    if (this.paginationService.currentPage > 1) {
      this.paginationService.currentPage -= 1;
    }
    this.fetchModels();
  }
}
