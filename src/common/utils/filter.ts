export interface FilterI<T> {
  property: string;
  category: string;
  value: T;
  label?: T;
}

export interface RangeFilterI {
  property: string;
  category: string;
  val1: number;
  val2: number;
}

class Filter<T> implements FilterI<T> {
  constructor(
    public property: string,
    public category: string,
    public value: T,
    public label?: T
  ) {
    this.property = property;
    this.category = category;
    this.value = value;
    this.label = label || value;
  }

  applyFilter() {
    return `${this.property} = ${this.value}`;
  }

  renderFilter() {
    return `${this.category}: ${this.value}`;
  }
}

class RangeFilter implements RangeFilterI {
  constructor(
    public property: string,
    public category: string,
    public val1: number,
    public val2: number
  ) {
    this.property = property;
    this.category = category;
  }
}
