import React from 'react';

import { Input } from '../Form/Input';
import { Select } from '../Form/Select';
import { Link } from 'react-router-dom';
import { SortT } from '../../common/types';
import { Button } from '../Elements/Button';
import { ModelFilters } from './ModelFilters';
import { ModelsList } from './ModelsList';

import { useVeichleStore } from '../../common/hooks/useVeichleStore';

import './Models.scss';

import { observer } from 'mobx-react-lite';

const MODELS_SORT_VALUES = [
  { label: 'Price (Highest)', ascending: true, value: 'price' },
  { label: 'Year (Latest)', ascending: true, value: 'year' },
  { label: 'Price (Lovest)', ascending: false, value: 'price' },
  { label: 'Year (Oldest)', ascending: false, value: 'year' },
];

export const Models = () => {
  return (
    <div className='models__container'>
      <div className='models__header '>
        <Input
          variant='models__search-filter'
          placeholder='&#128269; Search Models'
        />

        <div className='models__header-left'>
          <Select<SortT>
            label='Sort by:'
            options={MODELS_SORT_VALUES}
            defaultValue='Price(Highest)'
          />
          <Link to='addModel'>
            <Button size='large'>Add Veichle</Button>
          </Link>
        </div>
      </div>

      <ModelsList />
    </div>
  );
};
