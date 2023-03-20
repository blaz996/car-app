import { FilterValue } from '../types';

export const veichleFilters: FilterValue[] = [
  { label: 'Year', options: [2022, 2023, 2019, 2018] },
  { label: 'Brand', options: ['Audi', 'Toyota', 'Citroen', 'BMW', 'Mercedes'] },
  { label: 'Price', options: [21000, 22000, 19000, 25000] },
];

export const veichleSortValues = ['year', 'brand', 'price'];
