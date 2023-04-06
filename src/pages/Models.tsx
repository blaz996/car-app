import React, { useRef, useEffect } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { observer } from 'mobx-react';

import {
  MODELS_SORT_VALUES,
  MODELS_SORT_SELECT_OPTIONS,
} from '../common/utils/data';
import { VeichleHeader } from '../layouts/VeichleHeader';
import { ModelsList } from '../components/VeichleModel/ModelsList';
import { SearchFilter } from '../common/utils/Filter';
import { useRootStore } from '../common/hooks/useRootStore';
import { Sort } from '../common/utils/Sort';

import './Models.scss';

export const Models = observer(() => {
  const { modelsStore } = useRootStore();

  useEffect(() => {
    modelsStore.setMakesFilters();
  }, []);

  const handleSearchBarSubmit = (
    e: React.ChangeEvent<HTMLFormElement>,
    searchValue: string
  ) => {
    e.preventDefault();
    if (searchValue === '') {
      modelsStore.removeFilter('name', true);
      return;
    }
    const filter = new SearchFilter({
      category: 'name',
      property: 'name',
      value: searchValue,
    });
    modelsStore.toggleFilter(filter);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortValue = MODELS_SORT_VALUES.find(
      (sortV) => sortV.label === e.target.value
    );
    modelsStore.addSortValue(
      new Sort(sortValue!.property, sortValue!.ascending, e.target.value)
    );
  };

  return (
    <>
      <div className='models__container'>
        <VeichleHeader
          handleSearchBarSubmit={handleSearchBarSubmit}
          handleSelectValueChange={handleSortChange}
          selectOptions={MODELS_SORT_SELECT_OPTIONS}
          linkRoute='addModel'
          linkText='New Model'
          selectDefaultValue={modelsStore.sortValue.label}
        />

        <ModelsList />
      </div>
    </>
  );
});
