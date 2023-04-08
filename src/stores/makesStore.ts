import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from './rootStore';

import { Sort } from '../common/utils/sort';
import { MakesApiService } from './services/apiServices';
import { Filter } from '../common/utils/filter';
import { FiltersService } from './services/filtersService';
import { PaginationService } from './services/paginationService';

export type VeichleMakeI = {
  name: string;
  imageUrl: string;
  id: string;
};

export class MakesStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  //sortValue: Sort = new Sort('name', true, 'Name(Ascending)');

  makes: VeichleMakeI[] = [];
  makesStatus: string = 'idle';
  make: VeichleMakeI =
    JSON.parse(localStorage.getItem('currMake') || '{}') ||
    ({} as VeichleMakeI);
  makeStatus: string = 'idle';
  isDeleting: boolean = false;

  makesFilters: VeichleMakeI[] = [];

  filtersService: FiltersService = new FiltersService(
    new Sort('name', true, 'Name(Ascending)')
  );
  paginationService: PaginationService = new PaginationService();
  apiService: MakesApiService = new MakesApiService();

  async fetchMakes(rpp: number = 10) {
    this.makesStatus = 'loading';
    try {
      const { data } = await this.apiService.getMakes(
        this.filtersService.applyFilters(),
        this.filtersService.applySort(),
        this.paginationService.currentPage,
        rpp
      );
      runInAction(() => {
        this.paginationService.totalRecords = data.totalRecords;
        this.makes = data.item;
        this.makesStatus = 'success';
      });
    } catch (err) {
      this.makesStatus = 'error';
    }
  }

  async fetchMake(id: string) {
    this.makeStatus = 'loading';
    try {
      const { data } = await this.apiService.getMake(id);
      runInAction(() => {
        window.localStorage.setItem('currMake', JSON.stringify(data));
        this.make = data;
        this.makeStatus = 'success';
      });
    } catch (err) {
      this.makeStatus = 'error';
    }
  }

  async fetchMakeByName(name: string) {
    const { data } = await this.apiService.getMakes(
      `&searchQuery=WHERE "name" = '${name}'`,
      this.filtersService.applySort()
    );

    return data.item[0];
  }

  async fetchMakeName(id: string) {
    const { data } = await this.apiService.getMake(id);

    return data.name;
  }

  async createMake(make: Omit<VeichleMakeI, 'id'>) {
    try {
      const { data } = await this.apiService.add(make);
      runInAction(() => {
        this.makes = [...this.makes, data];
      });
    } catch (err) {
      throw new Error(err as string);
    }
  }

  async editMake(id: string, editedMake: VeichleMakeI) {
    try {
      await this.apiService.edit(id, editedMake);
      runInAction(() => {
        this.makes = this.makes.map((make) => {
          if (make.id === id) {
            return { ...make, ...editedMake };
          }
          return make;
        });
      });
    } catch (err) {
      throw new Error(err as string);
    }
  }

  async deleteMake(id: string) {
    this.isDeleting = true;
    try {
      await this.apiService.delete(id);
      await this.rootStore.modelsStore.deleteAllModelsForMake(id);
      runInAction(() => {
        this.makes = this.makes.filter((make) => make.id !== id);
        this.isDeleting = false;
        if (this.paginationService.pageEmpty(this.makes)) {
          this.handleEmptyPage();
        }
      });
    } catch (err) {
      throw new Error(err as string);
    }
  }

  async setMakesFilters() {
    const { data } = await this.apiService.getMakes(
      this.filtersService.applyFilters(),
      this.filtersService.applySort(),
      1,
      100
    );
    runInAction(
      () =>
        (this.makesFilters = data.item.sort(
          (a: VeichleMakeI, b: VeichleMakeI) =>
            a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        ))
    );
  }

  handleEmptyPage() {
    if (this.paginationService.currentPage > 1) {
      this.paginationService.currentPage -= 1;
    }
    this.fetchMakes();
  }
}
