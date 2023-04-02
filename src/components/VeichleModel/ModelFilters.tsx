import React from 'react';
import { useVeichleStore } from '../../common/hooks/useVeichleStore';

import { observer } from 'mobx-react';
import { Accordion } from '../Elements/Accordion';
import { Filter } from '../Elements/Filter';
import { Radio } from '../Form/Radio';
import { FilterT } from '../../common/types';
import { VeichleMakeT } from '../../common/types';
import { FilterGroup } from '../Elements/FilterGroup';
import { FilterRange } from '../Elements/FilterRange';

import './ModelFilters.scss';

const FILTER_CATEGORIES = ['Brands', 'Year', 'Price', 'Type'];

export const ModelFilters = observer(() => {
  const {
    getMakeNames,
    getMakeIds,
    addFilter,
    removeFilter,
    modelsStatus,
    makesStatus,
    getModelYears,
  } = useVeichleStore();

  if (
    modelsStatus === 'loading' ||
    modelsStatus === 'error' ||
    makesStatus === 'loading' ||
    makesStatus === 'error'
  ) {
    return null;
  }
  const makeIds = getMakeIds();
  const makeNames = getMakeNames();
  const modelYears = getModelYears();
  const modelTypes = [
    'Sedan',
    'Coupe',
    'Hatchback',
    'Sports Car',
    'Convertible',
  ];

  const FILTERS = [
    { property: 'makeId', values: getMakeIds(), labels: getMakeNames() },
    { property: 'year', values: modelYears, labels: modelYears },
    { property: 'price', values: [], labels: [] },
    {
      property: 'types',
      values: modelTypes,
      labels: modelTypes,
    },
  ];

  return (
    <div className='model-filters'>
      <h3 className='model-filters__title'>FILTERS</h3>
      {FILTER_CATEGORIES.map((category, i) => {
        if (category === 'Price') {
          return (
            <Accordion accordionTitle={category}>
              <FilterRange />
            </Accordion>
          );
        }
        return (
          <Accordion accordionTitle={category}>
            <FilterGroup
              addFilter={addFilter}
              removeFilter={removeFilter}
              key={category}
              property={FILTERS[i].property}
              filterLabels={FILTERS[i].labels}
              filterValues={FILTERS[i].values}
            />
          </Accordion>
        );
      })}
    </div>
  );
});

/*
 {FILTER_CATEGORIES.map((category, i) => {
        return (
          <Accordion accordionTitle={category}>
            <FilterGroup
              addFilter={addFilter}
              removeFilter={removeFilter}
              key={category}
              property={FILTERS[i].property}
              filterLabels={FILTERS[i].labels}
              filterValues={FILTERS[i].values}
            />
          </Accordion>
        );
      })}
        );
        */
