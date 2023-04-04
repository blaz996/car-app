import { Button } from './Button';

import './ActiveFilter..scss';

import { useVeichleStore } from '../../common/hooks/useVeichleStore';
import { RangeFilter, ToggleFilter } from '../../common/utils/Filter';

type ActiveFilterProps = {};

export const ActiveFilter = ({
  filter,
}: {
  filter: RangeFilter | ToggleFilter;
}) => {
  const { removeFilter } = useVeichleStore();

  return (
    <div className='active-filter'>
      <span className='active-filter__atributes'>{filter.renderFilter()}</span>
      <span
        onClick={() => removeFilter(filter.property)}
        className='active-filter__close'
      >
        x
      </span>
    </div>
  );
};
