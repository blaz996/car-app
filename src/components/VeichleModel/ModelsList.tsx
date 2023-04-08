import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import { useDisclosure } from '../../common/hooks/useDisclosure';

import { Spinner } from '../Elements/Spinner';
import { useRootStore } from '../../common/hooks/useRootStore';
import { Model } from './Model';
import { Pagination } from '../Elements/Pagination';
import { ActiveFilter } from '../Elements/ActiveFilter';
import { ModelFilterMenu } from './ModelFilterMenu';

import './ModelsList.scss';

export const ModelsList = observer(() => {
  const { modelsStore, makesStore } = useRootStore();
  const { filtersService, paginationService } = modelsStore;
  const { isOpen, close, open } = useDisclosure();

  useEffect(() => {
    modelsStore.fetchModels();
  }, [paginationService.currentPage, filtersService.sortValue]);

  useEffect(() => {
    if (
      paginationService.currentPage === 1 ||
      filtersService.filters.length === 0
    ) {
      modelsStore.fetchModels();
    } else {
      paginationService.resetCurrentPage();
    }
  }, [filtersService.filters]);

  useEffect(() => {
    close();
  }, [filtersService.filters, filtersService.sortValue]);

  if (
    modelsStore.modelsStatus === 'loading' ||
    makesStore.makesStatus === 'loading'
  ) {
    return (
      <div className='list'>
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
      <div className='models-list'>
        <div className='list__header'>
          <h3 className='list__title'>Models</h3>
          <div className='list__active-filters'>
            {filtersService.filters.map((filter) => (
              <ActiveFilter
                filter={filter}
                handleRemove={filtersService.removeFilter}
              />
            ))}
          </div>

          <button onClick={open} className='list__filter-toggle'>
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

      {modelsStore.models.length > 0 && (
        <div className='models-list__pagination'>
          <Pagination
            currPage={paginationService.currentPage}
            nextPage={paginationService.nextPage}
            previousPage={paginationService.previousPage}
          />
        </div>
      )}

      <ModelFilterMenu shown={isOpen} handleClose={close} />
    </>
  );
});
