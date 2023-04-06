import React from 'react';

import { observer } from 'mobx-react';

import { useRootStore } from '../../common/hooks/useRootStore';
import { Accordion } from '../Elements/Accordion';
import { FilterGroup } from '../Elements/FilterGroup';
import { FilterRange } from '../Elements/FilterRange';
import { MODELS_TYPES } from '../../common/utils/data';

import './ModelFilters.scss';

export const ModelFilters = observer(() => {
  const { makesStore, modelsStore } = useRootStore();

  const makeIds = modelsStore.makesFilters.map((make) => make.id);
  const makeNames = modelsStore.makesFilters.map((make) => make.name);

  const FILTERS = [
    {
      category: 'brand',
      property: 'makeId',
      values: makeIds,
      labels: makeNames,
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
            <Accordion
              key={filter.category}
              accordionTitle={filter.category + 's'}
            >
              <FilterRange
                filter={filter}
                handleSubmit={modelsStore.toggleFilter}
              />
            </Accordion>
          );
        }
        return (
          <Accordion
            key={filter.category}
            accordionTitle={filter.category + 's'}
          >
            <FilterGroup
              onToggle={modelsStore.toggleFilter}
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
