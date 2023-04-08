import { makeAutoObservable } from 'mobx';
export class PaginationService {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }
  currentPage: number = 1;
  totalRecords: number = 0;

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
    } else return;
  }

  previousPage() {
    if (this.previousPageExists()) {
      this.currentPage -= 1;
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
