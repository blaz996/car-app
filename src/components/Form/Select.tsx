import React from 'react';

type Option = {
  label: string;
  value: string;
};

type SelectProps = {
  label?: string;
  options: Option[];
};

export const Select = ({ label, options }: SelectProps) => {
  return (
    <div className='select__wrapper'>
      {label && <p className='select__label'>{label}</p>}
      <select name='' id=''>
        {options.map((option) => (
          <option value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};
