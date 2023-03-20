import React from 'react';

import './Input.scss';

type InputProps = {
  error?: string;
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ error, label, ...props }: InputProps) => {
  return (
    <div className='input__wrapper'>
      {error ? <p className='input__error-message'>{error}</p> : null}
      <input className={`input ${error ? 'input--error' : ''} `} {...props} />
      {label ? <p className='input__label'>{label}</p> : null}
    </div>
  );
};
