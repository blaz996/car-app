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
import { MODELS_TYPES } from '../../common/utils/data';

import './ModelFilters.scss';

export const ModelFilters = observer(() => {
  const { getMakeNames, getMakeIds, modelsStatus, makesStatus } =
    useVeichleStore();

  if (
    modelsStatus === 'loading' ||
    modelsStatus === 'error' ||
    makesStatus === 'loading' ||
    makesStatus === 'error'
  ) {
    return null;
  }

  const FILTERS = [
    {
      category: 'brand',
      property: 'makeId',
      values: getMakeIds(),
      labels: getMakeNames(),
      type: 'toggle',
    },
    {
      category: 'type',
      property: 'type',
      values: MODELS_TYPES,
      type: 'toggle',
    },
    {
      category: 'year',
      property: 'year',
      values: [],

      type: 'range',
    },
    { category: 'price', property: 'price', values: [], type: 'range' },
  ];

  return (
    <div className='model-filters'>
      <h3 className='model-filters__title'>FILTERS</h3>
      {FILTERS.map((filter, i) => {
        if (filter.type === 'range') {
          return (
            <Accordion accordionTitle={filter.category + 's'}>
              <FilterRange filter={filter} />
            </Accordion>
          );
        }
        return (
          <Accordion accordionTitle={filter.category + 's'}>
            <FilterGroup
              key={filter.category}
              property={filter.property}
              category={filter.category}
              labels={filter.labels || filter.values}
              values={filter.values}
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
