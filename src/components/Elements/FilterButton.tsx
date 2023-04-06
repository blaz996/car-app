import React, { useState } from 'react';

import './FilterButton.scss';
import { ToggleFilterI } from '../../common/utils/filter';
import { Button } from './Button';

type FilterProps = {
  filter: ToggleFilterI;
  handleClick: (filter: ToggleFilterI) => void;
};

export const FilterButton = ({
  filter,
  handleClick,
  ...props
}: FilterProps) => {
  return (
    <div className='filter-btn__container'>
      <Button onClick={() => handleClick(filter)} {...props}>
        {filter.label || filter.value}
      </Button>
    </div>
  );
};
