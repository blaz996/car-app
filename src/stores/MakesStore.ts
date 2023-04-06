import { makeAutoObservable, runInAction } from 'mobx';
import { RootStore } from './RootStore';

import { Sort } from '../common/utils/Sort';
import { MakesApiService } from './services/ApiServices';
import { Filter } from '../common/utils/Filter';
import axios from 'axios';

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

  makes: VeichleMakeI[] = [];
  makesStatus: string = 'idle';
  make: VeichleMakeI = {} as VeichleMakeI;
  makeStatus: string = 'idle';
  isDeleting: boolean = false;
  filters: Filter[] = [];
  sortValue: Sort = new Sort('name', true, 'Name(Ascending)');
  currentPage: number = 1;
  totalRecords: number = 1;

  apiService: MakesApiService = new MakesApiService();

  async fetchMakes(rpp: number = 10) {
    this.makesStatus = 'loading';
    try {
      const { data } = await this.apiService.getMakes(
        this.applyFilters(),
        this.sortValue.applySort(),
        this.currentPage,
        rpp
      );
      runInAction(() => {
        this.totalRecords = data.totalRecords;
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
      this.sortValue.applySort()
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
        if (this.pageEmpty(this.makes)) {
          this.handleEmptyPage();
        }
      });
    } catch (err) {
      throw new Error(err as string);
    }
  }

  handleEmptyPage() {
    if (this.currentPage > 1) {
      this.currentPage -= 1;
    }
    this.fetchMakes();
  }

  toggleFilter(currFilter: Filter) {
    if (
      this.filters.find((filter) => filter.property === currFilter.property)
    ) {
      this.removeFilter(currFilter.property);
    }
    this.addFilter(currFilter);

    this.currentPage = 1;
    this.fetchMakes();
  }

  addFilter(currFilter: Filter) {
    this.currentPage = 1;
    this.filters = [...this.filters, currFilter];
  }

  removeFilter(property: string, refetch: boolean = false) {
    this.currentPage = 1;
    this.filters = this.filters.filter(
      (filter) => filter.property !== property
    );

    if (refetch) {
      this.currentPage = 1;
      this.fetchMakes();
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
    this.currentPage -= 1;
    this.sortValue = sortV;
    this.fetchMakes();
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
      this.fetchMakes();
    } else return;
  }

  previousPage() {
    if (this.previousPageExists()) {
      this.currentPage -= 1;
      this.fetchMakes();
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
