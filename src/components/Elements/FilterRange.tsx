import React, { useRef } from 'react';

import { Input } from '../Form/Input';
import { Button } from './Button';
import { RangeFilter, RangeFilterI } from '../../common/utils/Filter';
import { useVeichleStore } from '../../common/hooks/useVeichleStore';

import './FilterRange.scss';

export const FilterRange = ({
  filter,
}: {
  filter: Omit<RangeFilterI, 'val1' | 'val2'>;
}) => {
  const { toggleFilter } = useVeichleStore();
  const input1 = useRef<HTMLInputElement>(null);
  const input2 = useRef<HTMLInputElement>(null);

  const submitFilter = () => {
    const val1 = Number(input1.current?.value);
    const val2 = Number(input2.current?.value);
    const currFilter = new RangeFilter(
      filter.property,
      filter.category,
      val1,
      val2
    );
    toggleFilter(currFilter);
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
