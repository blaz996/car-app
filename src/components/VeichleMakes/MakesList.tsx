import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useRootStore } from '../../common/hooks/useRootStore';

import { Make } from './Make';
import { ActiveFilter } from '../Elements/ActiveFilter';
import { Spinner } from '../Elements/Spinner';
import { Sort } from '../../common/utils/sort';
import { Select } from '../Form/Select';

import './MakesList.scss';
import { Pagination } from '../Elements/Pagination';

export const MakeList = observer(() => {
  const { makesStore } = useRootStore();
  const { filtersService, paginationService } = makesStore;

  useEffect(() => {
    makesStore.fetchMakes();
  }, [paginationService.currentPage]);

  useEffect(() => {
    if (paginationService.currentPage === 1) {
      makesStore.fetchMakes();
    } else {
      paginationService.resetCurrentPage();
    }
  }, [filtersService.filters, filtersService.sortValue]);
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let sortValue;
    if (e.target.value === 'Name (Ascending)') {
      sortValue = new Sort('name', true, 'Name (Ascending)');
    } else {
      sortValue = new Sort('name', false, 'Name (Descending)');
    }
    filtersService.addSortValue(sortValue);
  };

  if (makesStore.makesStatus === 'loading') {
    return <Spinner size='large' />;
  }
  if (makesStore.makesStatus === 'error') {
    return <h1 className='makes-list__error'>Error Fetching Makes</h1>;
  }
  return (
    <>
      <div className='makes-list'>
        <div className='list__header'>
          <h1 className='list__title'>Veichle Makes</h1>
          <Select
            label='Sort by:'
            options={[
              { label: 'Name (Ascending)' },
              { label: 'Name (Descending)' },
            ]}
            defaultValue={filtersService.sortValue.label}
            onChange={handleSortChange}
          />

          <div className='list__active-filters'>
            {filtersService.filters.map((filter) => (
              <ActiveFilter
                filter={filter}
                handleRemove={filtersService.removeFilter}
              />
            ))}
          </div>
        </div>
        {makesStore.makes.length === 0 ? (
          <h1 className='list--empty'>No Makes Found</h1>
        ) : (
          <ul className='list'>
            {makesStore.makes.map((make) => (
              <Make make={make} key={make.id} />
            ))}
          </ul>
        )}
      </div>
      <div className='makes-list__pagination'>
        {makesStore.makes.length !== 0 && (
          <Pagination
            currPage={paginationService.currentPage}
            nextPage={paginationService.nextPage}
            previousPage={paginationService.previousPage}
          />
        )}
      </div>
    </>
  );
});
