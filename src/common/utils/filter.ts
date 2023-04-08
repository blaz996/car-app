export interface FilterI {
  type?: string;
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

export class Filter implements FilterI {
  type?: string = 'toggle';
  property: string;
  category: string;
  constructor(filter: FilterI) {
    this.property = filter.property;
    this.category = filter.category;
  }

  applyFilter(arg?: any): string {
    return '';
  }

  renderFilter(): string {
    return '';
  }
}

export class ToggleFilter extends Filter implements ToggleFilterI {
  value: string | number;
  label?: string | number;
  constructor(filter: ToggleFilterI) {
    super({ category: filter.category, property: filter.property });
    this.value = filter.value;
    this.label = filter?.label || filter.value;
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

export class RangeFilter extends Filter implements RangeFilterI {
  type: string = 'range';
  val1: number;
  val2: number;
  constructor(filter: RangeFilterI) {
    super({
      property: filter.property,
      category: filter.category,
      type: 'range',
    });
    this.val1 = filter.val1;
    this.val2 = filter.val2;
  }

  applyFilter() {
    console.log(
      `"${this.property}" >= ${this.val1} AND "${this.property}" <= ${this.val2}`
    );
    return `"${this.property}" >= ${this.val1} AND "${this.property}" <= ${this.val2}`;
  }

  renderFilter() {
    return `${this.category}: ${this.val1} - ${this.val2}`;
  }
}

export class SearchFilter extends Filter implements SearchFilterI {
  value: string;
  constructor(filter: SearchFilterI) {
    super({
      property: filter.property,
      category: filter.category,
      type: 'search',
    });
    this.value = filter.value;
  }
  applyFilter(pos: number) {
    if (pos !== 0) {
      return `("${this.property}" LIKE '${this.value}%' OR "${this.property}" = '${this.value}')`;
    } else {
      return `"${this.property}" LIKE '${this.value}%' OR "${this.property}" = '${this.value}'`;
    }
  }

  renderFilter(): string {
    return `${this.category}: ${this.value}`;
  }
}
