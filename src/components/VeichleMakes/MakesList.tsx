import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useRootStore } from '../../common/hooks/useRootStore';

import { Make } from './Make';
import { ActiveFilter } from '../Elements/ActiveFilter';
import { Spinner } from '../Elements/Spinner';
import { Sort } from '../../common/utils/Sort';
import { Select } from '../Form/Select';

import './MakesList.scss';
import { Pagination } from '../Elements/Pagination';

export const MakeList = observer(() => {
  const { makesStore } = useRootStore();

  useEffect(() => {
    makesStore.fetchMakes();
  }, []);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let sortValue;
    if (e.target.value === 'Name (Ascending)') {
      sortValue = new Sort('name', true, 'Name (Ascending)');
    } else {
      sortValue = new Sort('name', false, 'Name (Descending)');
    }
    makesStore.addSortValue(sortValue);
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
            defaultValue={makesStore.sortValue.label}
            onChange={handleSortChange}
          />

          <div className='list__active-filters'>
            {makesStore.filters.map((filter) => (
              <ActiveFilter
                filter={filter}
                handleRemove={makesStore.removeFilter}
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
            currPage={makesStore.currentPage}
            nextPage={makesStore.nextPage}
            previousPage={makesStore.previousPage}
          />
        )}
      </div>
    </>
  );
});
