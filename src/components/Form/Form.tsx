import React from 'react';

import './Form.scss';

type FormProps = {
  children: React.ReactNode;
  variant?: string;
} & React.FormHTMLAttributes<HTMLFormElement>;

export const Form = ({ children, variant, ...props }: FormProps) => {
  return (
    <form className={`form ${variant}`} {...props}>
      {children}
    </form>
  );
};
