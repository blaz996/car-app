import React, { useRef } from 'react';

import { Input } from '../Form/Input';
import { Button } from './Button';
import {
  Filter,
  FilterI,
  RangeFilter,
  RangeFilterI,
} from '../../common/utils/filter';

import './FilterRange.scss';

type FilterRangeProps = {
  filter: FilterI;
  handleSubmit: (filter: Filter) => void;
};

export const FilterRange = ({ filter, handleSubmit }: FilterRangeProps) => {
  const input1 = useRef<HTMLInputElement>(null);
  const input2 = useRef<HTMLInputElement>(null);

  const submitFilter = () => {
    const val1 = Number(input1.current?.value);
    const val2 = Number(input2.current?.value);
    const currFilter = new RangeFilter({ ...filter, val1, val2 });
    handleSubmit(currFilter);
  };
  return (
    <div className='filter-range__container'>
      <div className='filter-range'>
        <Input type='number' ref={input1} />
        <span>To</span>
        <Input type='number' ref={input2} />
      </div>
      <Button onClick={submitFilter} size='medium'>
        Add
      </Button>
    </div>
  );
};
