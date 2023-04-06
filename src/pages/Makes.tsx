import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Input } from '../components/Form/Input';
import { Button } from '../components/Elements/Button';
import { MakeList } from '../components/VeichleMakes/MakesList';
import { Select } from '../components/Form/Select';
import { Form } from '../components/Form/Form';
import { SearchFilter } from '../common/utils/Filter';
import { AiOutlineSearch } from 'react-icons/ai';
import { useRootStore } from '../common/hooks/useRootStore';

import './Makes.scss';
import { Sort } from '../common/utils/Sort';
import { VeichleHeader } from '../layouts/VeichleHeader';

export const Makes = observer(() => {
  const { makesStore } = useRootStore();

  const handleSearchBarSubmit = (
    e: React.ChangeEvent<HTMLFormElement>,
    searchValue: string
  ) => {
    e.preventDefault();
    if (searchValue === '') {
      makesStore.removeFilter('name', true);
      return;
    }
    const filter = new SearchFilter({
      category: 'name',
      property: 'name',
      value: searchValue,
    });
    makesStore.toggleFilter(filter);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let sortValue;

    if (e.target.value === 'Name (Ascending)') {
      sortValue = new Sort('name', true, 'Name (Ascending)');
    } else {
      sortValue = new Sort('name', false, 'Name (Descending)');
    }
    makesStore.addSortValue(sortValue);
  };

  return (
    <div className='makes__container'>
      <VeichleHeader
        handleSearchBarSubmit={handleSearchBarSubmit}
        handleSelectValueChange={handleSortChange}
        selectOptions={[
          { label: 'Name (Ascending)' },
          { label: 'Name (Descending)' },
        ]}
        linkRoute='addMake'
        linkText='Add Make'
        selectDefaultValue={makesStore.sortValue.label}
      />
      <MakeList />
    </div>
  );
});
