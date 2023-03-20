import React from 'react';

import './Radio.scss';

type RadioProps = {
  label: string;
  handleSelect: () => void;
  id: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Radio = ({ label, handleSelect, id, ...props }: RadioProps) => {
  return (
    <div className='box'>
      <label className='radio__label' htmlFor={id}>
        {label}
      </label>
      <input
        className='radio'
        type='radio'
        value={label}
        id={label}
        onChange={handleSelect}
        {...props}
      />
    </div>
  );
};
