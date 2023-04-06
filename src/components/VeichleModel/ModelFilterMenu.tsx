import React, { useEffect } from 'react';
import { observer } from 'mobx-react';

import { ModelFilters } from './ModelFilters';
import { useRootStore } from '../../common/hooks/useRootStore';

import {
  MODELS_SORT_SELECT_OPTIONS,
  MODELS_SORT_VALUES,
} from '../../common/utils/data';
import { Sort } from '../../common/utils/sort';
import { Select } from '../Form/Select';
import { Overlay } from '../../layouts/Overlay';

import './ModelFilterMenu.scss';

type ModelFilterMenuProps = {
  shown: boolean;
  handleClose: () => void;
};

export const ModelFilterMenu = observer(
  ({ shown, handleClose }: ModelFilterMenuProps) => {
    const { modelsStore } = useRootStore();

    useEffect(() => {
      handleClose();
    }, [modelsStore.filters, modelsStore.sortValue]);

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const sortValue = MODELS_SORT_VALUES.find(
        (sortV) => sortV.label === e.target.value
      );
      modelsStore.addSortValue(
        new Sort(sortValue!.property, sortValue!.ascending, e.target.value)
      );
    };
    return (
      <Overlay shown={shown}>
        <div className='filter-menu'>
          <button onClick={handleClose} className='filter-menu__close'>
            X
          </button>
          <Select
            label='Sort by:'
            options={MODELS_SORT_SELECT_OPTIONS}
            defaultValue={modelsStore.sortValue.label}
            onChange={handleSortChange}
          />
          <ModelFilters />
        </div>
      </Overlay>
    );
  }
);
