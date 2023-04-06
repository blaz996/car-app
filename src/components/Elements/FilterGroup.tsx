import { FilterButton } from './FilterButton';
import { ToggleFilterI, ToggleFilter, Filter } from '../../common/utils/filter';

import './FilterGroup.scss';

type FilterGroupProps = {
  values: number[] | string[];
  labels?: number[] | string[];
  category: string;
  property: string;
  onToggle: (filter: Filter) => void;
};

export const FilterGroup = ({
  values,
  category,
  property,
  labels,
  onToggle,
}: FilterGroupProps) => {
  const handleToggle = (filter: ToggleFilterI) => {
    const currFilter = new ToggleFilter({ ...filter });
    onToggle(currFilter);
  };

  return (
    <div className='filter__group'>
      {values.map((value, i) => {
        return (
          <FilterButton
            key={value}
            filter={{
              category,
              property,
              value,
              label: labels![i] || value,
            }}
            handleClick={handleToggle}
          />
        );
      })}
    </div>
  );
};
