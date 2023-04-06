import { Button } from './Button';

import './ActiveFilter..scss';

import { Filter, RangeFilter, ToggleFilter } from '../../common/utils/filter';

type ActiveFilterProps = {
  filter: Filter;
  handleRemove: (property: string, refetch: boolean) => void;
};

export const ActiveFilter = ({ filter, handleRemove }: ActiveFilterProps) => {
  return (
    <div className='active-filter'>
      <span className='active-filter__atributes'>{filter.renderFilter()}</span>
      <span
        onClick={() => handleRemove(filter.property, true)}
        className='active-filter__close'
      >
        x
      </span>
    </div>
  );
};
