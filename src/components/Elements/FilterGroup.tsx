import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { FilterT } from '../../common/types';

import { Form } from '../Form/Form';
import { Filter } from './Filter';

import './FilterGroup.scss';

type FilterGroupProps = {
  addFilter: (filter: FilterT) => void;
  removeFilter: (filter: FilterT) => void;
  filterValues: string[] | number[];
  property: string;
  filterLabels?: string[] | number[];
};

export const FilterGroup = observer(
  ({
    addFilter,
    removeFilter,
    filterValues,
    property,
    filterLabels,
  }: FilterGroupProps) => {
    const [activeFilter, setActiveFilter] = useState<string | number>('');

    const handleChange = (
      e: React.MouseEvent<HTMLInputElement>,
      filter: FilterT
    ) => {
      if (filter.value === activeFilter) {
        setActiveFilter('');
        removeFilter(filter);
      } else {
        setActiveFilter(filter.value);
        addFilter(filter);
      }
    };

    return (
      <div className='filter__group'>
        {filterValues.map((filterV, i) => {
          return (
            <Filter
              currFilter={activeFilter}
              property={property}
              label={filterLabels![i] || filterV}
              value={filterV}
              handleChange={handleChange}
            />
          );
        })}
      </div>
    );
  }
);
