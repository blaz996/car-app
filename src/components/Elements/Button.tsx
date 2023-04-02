import React, { ButtonHTMLAttributes } from 'react';

import './Button.scss';

const BUTTON_VARIANTS = {
  primary: 'btn--primary',
  secondary: 'btn--secondary',
  red: 'btn--red',
};

const BUTTON_SIZES = {
  small: 'btn--sm',
  medium: 'btn--md',
  large: 'btn--lg',
};

type ButtonProps = {
  children: React.ReactNode;
  variant?: keyof typeof BUTTON_VARIANTS;
  size?: keyof typeof BUTTON_SIZES;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  size = 'medium',
  variant = 'primary',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`btn ${BUTTON_SIZES[size]} ${BUTTON_VARIANTS[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
};
