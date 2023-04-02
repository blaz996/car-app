export type VeichleMakeT = {
  name: string;
};

export type VeichleModelT = {
  name: string;
  makeId: string;
};

export type SortValue = {
  label: string;
  ascending: string;
};

export type FilterT = {
  property: string;
  value: string | number;
  label?: string | number;
};

export type RangeFilterT = {
  property: string;
  value: string[] | number[];
  category: string;
};

export type SortT = {
  label: string;
  value: string;
  ascending: boolean;
};
