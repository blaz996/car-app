import React from 'react';

import './Input.scss';

type InputProps = {
  error?: string;
  label?: string;
  variant?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error, label, variant, ...props }, inputRef) => {
    return (
      <div className='input__wrapper'>
        {error ? <p className='input__error-message'>{error}</p> : null}
        <input
          ref={inputRef}
          className={`input ${variant ? variant : ''} ${
            error ? 'input--error' : ''
          } `}
          {...props}
        />
        {label ? <p className='input__label'>{label}</p> : null}
      </div>
    );
  }
);
