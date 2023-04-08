import { makeAutoObservable } from 'mobx';
import { Filter } from '../../common/utils/filter';
import { Sort } from '../../common/utils/sort';

export class FiltersService {
  constructor(defaultSort: Sort) {
    this.sortValue = defaultSort;
    makeAutoObservable(this, {}, { autoBind: true });
  }

  filters: Filter[] = [];
  sortValue: Sort;
  toggleFilter(currFilter: Filter) {
    if (
      this.filters.find((filter) => filter.property === currFilter.property)
    ) {
      this.removeFilter(currFilter.property);
    }
    this.addFilter(currFilter);
  }

  addFilter(currFilter: Filter) {
    this.filters = [...this.filters, currFilter];
  }

  removeFilter(property: string, refetch: boolean = false) {
    this.filters = this.filters.filter(
      (filter) => filter.property !== property
    );
  }

  applyFilters() {
    if (this.filters.length === 0) return '';
    let filterString = '&searchQuery=';
    this.filters.forEach((filter, i) => {
      if (i === 0) {
        filterString += `WHERE ${filter.applyFilter(i)}`;
      } else {
        filterString += ` AND ${filter.applyFilter(i)}`;
      }
    });

    return filterString;
  }

  addSortValue(sortV: Sort) {
    this.sortValue = sortV;
  }

  applySort() {
    return this.sortValue.applySort();
  }

  clearFilters() {
    this.filters = [];
  }
}
