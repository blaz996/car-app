import { makeAutoObservable } from 'mobx';

export interface FilterI {
  property: string;
  category: string;
}

export interface ToggleFilterI extends FilterI {
  value: string | number;
  label?: string | number;
}

export interface RangeFilterI extends FilterI {
  val1: number;
  val2: number;
}

export interface SearchFilterI extends FilterI {
  value: string;
}

export class ToggleFilter implements FilterI {
  type: string = 'toggle';
  constructor(
    public property: string,
    public category: string,

    public value: number | string,
    public label?: number | string
  ) {
    this.property = property;
    this.category = category;
    this.value = value;
    this.label = label || value;
  }

  applyFilter() {
    return `"${this.property}" = '${this.value}'`;
  }

  renderFilter() {
    if (this.property === 'makeId') {
      return `${this.category}: ${this.label}`;
    }
    return `${this.category}: ${this.value}`;
  }
}

export class RangeFilter implements RangeFilterI {
  type: string = 'range';
  constructor(
    public property: string,
    public category: string,
    public val1: number,
    public val2: number
  ) {
    this.property = property;
    this.category = category;
    this.val1 = val1;
    this.val2 = val2;
  }

  applyFilter() {
    return `"${this.property}" >= ${this.val1} AND "${this.property}" <= ${this.val2}`;
  }

  renderFilter() {
    return `${this.category}: ${this.val1} - ${this.val2}`;
  }
}
