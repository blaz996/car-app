import React, { useState } from 'react';
import { observer } from 'mobx-react';

import { FilterT } from '../../common/types';

import './Filter.scss';

type FilterProps = {
  property: string;
  currFilter: string | number;
  label: string | number;
  value: string | number;
  handleChange: (
    e: React.MouseEvent<HTMLInputElement>,
    filter: FilterT
  ) => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Filter = observer(
  ({
    label,
    currFilter,
    value,
    property,
    handleChange,
    ...props
  }: FilterProps) => {
    return (
      <div className='filter__container'>
        <input
          type='radio'
          className='filter'
          value={value}
          id={value.toString()}
          checked={value === currFilter}
          onClick={(e) => handleChange(e, { value, property })}
        />
        <label className='filter__label' htmlFor={value.toString()}>
          {label}
        </label>
      </div>
    );
  }
);
