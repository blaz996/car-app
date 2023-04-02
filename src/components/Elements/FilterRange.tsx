import React, { useRef } from 'react';

import { Input } from '../Form/Input';
import { Button } from './Button';

import './FilterRange.scss';

export const FilterRange = ({}) => {
  const input1 = useRef<HTMLInputElement>(null);
  const input2 = useRef<HTMLInputElement>(null);

  const submitFilter = () => {};
  return (
    <div className='filter-range__container'>
      <div className='filter-range'>
        <Input type='number' ref={input1} />
        <span>To</span>
        <Input type='number' ref={input2} />
      </div>
      <Button size='medium'>Add</Button>
    </div>
  );
};
