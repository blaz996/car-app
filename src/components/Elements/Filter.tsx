import React, { useState } from 'react';
import { observer } from 'mobx-react';

import { FilterT } from '../../common/types';

import './Filter.scss';
import { ToggleFilterI } from '../../common/utils/Filter';

type FilterProps = {
  currFilter: string | number;
  filter: ToggleFilterI;

  handleChange: (
    e: React.MouseEvent<HTMLInputElement>,
    filter: ToggleFilterI
  ) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Filter = observer(
  ({ filter, currFilter, handleChange, ...props }: FilterProps) => {
    return (
      <div className='filter__container'>
        <input
          type='radio'
          className='filter'
          value={filter.value}
          id={filter.value.toString()}
          checked={filter.value === currFilter}
          onClick={(e) => handleChange(e, filter)}
        />
        <label className='filter__label' htmlFor={filter.value.toString()}>
          {filter.label}
        </label>
      </div>
    );
  }
);
