import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';

import { Spinner } from '../Elements/Spinner';
import { useRootStore } from '../../common/hooks/useRootStore';
import { Model } from './Model';
import { Pagination } from '../Elements/Pagination';
import { ModelFilters } from './ModelFilters';
import { ActiveFilter } from '../Elements/ActiveFilter';
import { useDisclosure } from '../../common/hooks/useDisclosure';
import { ModelFilterMenu } from './ModelFilterMenu';

import './ModelsList.scss';

export const ModelsList = observer(() => {
  const { modelsStore, makesStore } = useRootStore();

  useEffect(() => {
    modelsStore.fetchModels();
  }, []);

  if (
    modelsStore.modelsStatus === 'loading' ||
    makesStore.makesStatus === 'loading'
  ) {
    return (
      <div className='models-list'>
        <Spinner size='medium' />
      </div>
    );
  }

  if (
    modelsStore.modelsStatus === 'error' ||
    makesStore.makesStatus === 'error'
  ) {
    return <h1 className='models-list__error-msg'>Error Fetching Models</h1>;
  }

  return (
    <>
      <div className='models-list__container'>
        <div className='models-list__filters'>
          <ModelFilters />
        </div>
        <div className='models-list'>
          <div className='list__header'>
            <h3 className='list__title'>Models</h3>
            <div className='list__active-filters'>
              {modelsStore.filters.map((filter) => (
                <ActiveFilter
                  filter={filter}
                  handleRemove={modelsStore.removeFilter}
                />
              ))}
            </div>

            <button
              onClick={modelsStore.filterMenuStore.open}
              className='list__filter-toggle'
            >
              <span>Filters</span>
              <AdjustmentsHorizontalIcon />
            </button>
          </div>
          {modelsStore.models.length === 0 ? (
            <div className='list--empty'>
              <h3 className='list--empty'>No Models Found</h3>
            </div>
          ) : (
            <ul className='list'>
              {modelsStore.models.map((model) => (
                <Model key={model.id} model={model} />
              ))}
            </ul>
          )}
        </div>
      </div>
      {modelsStore.models.length > 0 && (
        <div className='models-list__pagination'>
          <Pagination
            currPage={modelsStore.currentPage}
            nextPage={modelsStore.nextPage}
            previousPage={modelsStore.previousPage}
          />
        </div>
      )}

      <ModelFilterMenu
        shown={modelsStore.filterMenuStore.isShown}
        handleClose={modelsStore.filterMenuStore.close}
      />
    </>
  );
});
