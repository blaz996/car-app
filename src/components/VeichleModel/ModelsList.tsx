import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';

import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';

import { useVeichleStore } from '../../common/hooks/useVeichleStore';
import { Input } from '../Form/Input';
import { Select } from '../Form/Select';
import { Spinner } from '../Elements/Spinner';
import { Accordion } from '../Elements/Accordion';

import { Model } from './Model';
import { Button } from '../Elements/Button';
import { SortT } from '../../common/types';
import { ModelFilters } from './ModelFilters';
import { ActiveFilter } from '../Elements/ActiveFilter';

import './ModelsList.scss';
import { autorun } from 'mobx';
import { ToggleFilter } from '../../common/utils/Filter';
import { toJS } from 'mobx';
import { action } from 'mobx';
import { Pagination } from '../Elements/Pagination';

const MODELS_SORT_VALUES = [
  { label: 'Price (Highest)', ascending: true, value: 'price' },
  { label: 'Year (Latest)', ascending: true, value: 'year' },
  { label: 'Price (Lovest)', ascending: false, value: 'price' },
  { label: 'Year (Oldest)', ascending: false, value: 'year' },
];

export const ModelsList = observer(() => {
  const {
    models,
    modelsStatus,
    filters,
    sortValue,
    currPage,
    nextPage,
    previousPage,
    fetchModels,
    toggleFilter,
  } = useVeichleStore();

  useEffect(() => {
    fetchModels();
  }, [filters, sortValue, currPage]);

  if (modelsStatus === 'loading') {
    return <Spinner size='medium' />;
  }

  if (modelsStatus === 'error') {
    return <h1 className='models-list__error-msg'>Error Fetching Models</h1>;
  }

  return (
    <div className='models-list__container'>
      <div className='models-list__filters'>
        <ModelFilters />
      </div>
      <div className='models-list'>
        <div className='list__header'>
          <h3 className='list__title'>Models</h3>
          <div className='list__active-filters'>
            {filters.map((filter) => (
              <ActiveFilter filter={filter} />
            ))}
          </div>

          <button className='list__filter-toggle'>
            <span>Filters</span>
            <AdjustmentsHorizontalIcon />
          </button>
        </div>
        {models.length === 0 ? (
          <h3 className='list--empty'>No Models Found</h3>
        ) : (
          <ul className='list'>
            {models.map((model) => (
              <Model key={model.id} model={model} />
            ))}
          </ul>
        )}
      </div>
      <div className='models-list__pagination'>
        <Pagination
          currPage={currPage}
          nextPage={nextPage}
          previousPage={previousPage}
        />
      </div>
    </div>
  );
});
