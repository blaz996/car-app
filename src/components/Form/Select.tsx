import React from 'react';

import './Select.scss';

type SelectProps<T> = {
  options: T[];
  placeholder?: string;
  defaultValue?: string | number;
  label?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = <T extends { label: string; value: string | number }>({
  options,
  placeholder,
  defaultValue,
  label,
  ...props
}: SelectProps<T>) => {
  return (
    <div className='select__wrapper'>
      {label && <p className='select__label'>{label}</p>}
      <select className='select' {...props}>
        <option disabled value='' defaultValue={placeholder} hidden>
          {placeholder}
        </option>
        {options.map((option) => {
          if (option.value === defaultValue) {
            return (
              <option selected value={option.value}>
                {option.label}
              </option>
            );
          }
          return <option value={option.value}>{option.label}</option>;
        })}
      </select>
    </div>
  );
};
