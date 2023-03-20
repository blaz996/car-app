export type VeichleMakeT = {
  name: string;
  id: number;
};

export type VeichleModelT = {
  name: string;
  makeId: number;
  id: number;
  price: number;
  year: number;
};

export type SortValue = {
  label: string;
  ascending: string;
};

export type FilterValue = {
  label: string;
  options: string[] | boolean[] | number[];
};
