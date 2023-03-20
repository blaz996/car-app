import React, { ButtonHTMLAttributes } from 'react';

const BUTTON_SIZES = {
  small: 'btn--sm',
  medium: 'btn--md',
  large: 'btn--lg',
};

type ButtonProps = {
  children: React.ReactNode;
  size?: keyof typeof BUTTON_SIZES;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  children,
  size = 'medium',
  ...props
}: ButtonProps) => {
  return (
    <button className={`btn ${BUTTON_SIZES[size]}`} {...props}>
      {children}
    </button>
  );
};
