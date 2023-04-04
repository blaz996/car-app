import React, { useRef, useEffect } from 'react';

import { Input } from '../Form/Input';
import { Select } from '../Form/Select';
import { Link } from 'react-router-dom';
import { SortT } from '../../common/types';
import { Button } from '../Elements/Button';
import { ModelFilters } from './ModelFilters';
import { Form } from '../Form/Form';
import { ModelsList } from './ModelsList';
import { ToggleFilter } from '../../common/utils/Filter';

import { AiOutlineSearch } from 'react-icons/ai';

import { useVeichleStore } from '../../common/hooks/useVeichleStore';

import './Models.scss';

import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { addHiddenFinalProp, remove } from 'mobx/dist/internal';
import { Sort } from '../../common/utils/Sort';

const MODELS_SORT_VALUES = [
  {
    label: 'Year (Latest)',
    ascending: false,
    property: 'year',
  },
  { label: 'Year (Oldest)', ascending: true, property: 'year' },
  { label: 'Price (Highest)', ascending: false, property: 'price' },
  { label: 'Price (Lowest)', ascending: true, property: 'price' },
];

const MODELS_SORT_SELECT_OPTIONS = [
  { label: 'Price (Highest)' },
  { label: 'Year (Latest)' },
  { label: 'Price (Lowest)' },
  { label: 'Year (Oldest)' },
];

export const Models = observer(() => {
  const {
    addSortValue,
    sortValue,
    filters,
    toggleFilter,
    fetchModels,
    fetchMakes,
    removeFilter,
  } = useVeichleStore();

  const searchValueRef = useRef<HTMLInputElement>(null);

  const handleSearchBarSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchValueRef.current?.value === '') {
      removeFilter('name');
      return;
    }
    const filter = new ToggleFilter(
      'name',
      'name',
      searchValueRef.current!.value
    );
    toggleFilter(filter);
  };

  const handleAddSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = MODELS_SORT_VALUES.find(
      (sortV) => sortV.label === e.target.value
    );
    addSortValue(
      new Sort(sortValue!.property, sortValue!.ascending, e.target.value)
    );
  };

  return (
    <div className='models__container'>
      <div className='models__header '>
        <Form onSubmit={handleSearchBarSubmit}>
          <Input
            ref={searchValueRef}
            variant='models__search-filter'
            placeholder='Search Models'
          />
          <Button type='submit'>
            <AiOutlineSearch />
          </Button>
        </Form>

        <div className='models__header-left'>
          <Select
            label='Sort by:'
            options={MODELS_SORT_SELECT_OPTIONS}
            defaultValue={sortValue.label}
            onChange={handleAddSort}
          />
          <Link to='addModel'>
            <Button size='large'>Add Veichle</Button>
          </Link>
        </div>
      </div>

      <ModelsList />
    </div>
  );
});
