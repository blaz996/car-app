import { makeAutoObservable } from 'mobx';
export class FilterMenuStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  isShown: boolean = false;

  open() {
    this.isShown = true;
  }
  close() {
    this.isShown = false;
  }
}
