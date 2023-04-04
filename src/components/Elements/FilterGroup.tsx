import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { Filter } from './Filter';
import { FilterT } from '../../common/types';

import { Form } from '../Form/Form';

import { ToggleFilterI, ToggleFilter } from '../../common/utils/Filter';
import { useVeichleStore } from '../../common/hooks/useVeichleStore';

import './FilterGroup.scss';

type FilterGroupProps = {
  values: number[] | string[];
  labels?: number[] | string[];
  category: string;
  property: string;
};

export const FilterGroup = observer(
  ({ values, category, property, labels }: FilterGroupProps) => {
    const [activeFilter, setActiveFilter] = useState<string | number>('');

    const { toggleFilter, removeFilter } = useVeichleStore();

    const handleChange = (
      e: React.MouseEvent<HTMLInputElement>,
      filter: ToggleFilterI
    ) => {
      const currFilter = new ToggleFilter(
        filter.property,
        filter.category,
        filter.value,
        filter.label
      );
      if (filter.value === activeFilter) {
        setActiveFilter('');
        removeFilter(currFilter.property);
      } else {
        setActiveFilter(filter.value);
        toggleFilter(currFilter);
      }
    };

    return (
      <div className='filter__group'>
        {values.map((value, i) => {
          return (
            <Filter
              currFilter={activeFilter}
              filter={{
                category,
                property,
                value,
                label: labels![i] || value,
              }}
              handleChange={handleChange}
            />
          );
        })}
      </div>
    );
  }
);
