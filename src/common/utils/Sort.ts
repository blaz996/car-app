export interface SortI {
  property: string;
  ascending: boolean;
  label: string;
}

export class Sort implements SortI {
  constructor(
    public property: string,
    public ascending: boolean,
    public label: string
  ) {
    this.property = property;
    this.ascending = ascending;
    this.label = label;
  }

  applySort() {
    const str = `${this.property}|${this.ascending ? 'asc' : 'desc'}`;

    return str;
  }
}
