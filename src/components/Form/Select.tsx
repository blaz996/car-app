import React from 'react';

import './Select.scss';

export type SelectOption = {
  label: string;
  value?: string | number;
};

type SelectProps = {
  options: SelectOption[];
  placeholder?: string;
  defaultValue?: string | number;
  label?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = ({
  options,
  placeholder,
  defaultValue,
  label,
  ...props
}: SelectProps) => {
  return (
    <div className='select__wrapper'>
      {label && <p className='select__label'>{label}</p>}
      <select className='select' {...props}>
        <option disabled value='' defaultValue={placeholder} hidden>
          {placeholder}
        </option>
        {options.map((option) => {
          if ((option.value || option.label) === defaultValue) {
            return (
              <option
                key={option.label}
                className='option'
                selected
                value={option.value || option.label}
              >
                {option.label}
              </option>
            );
          }
          return (
            <option
              key={option.label}
              className='option'
              value={option.value || option.label}
            >
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};
