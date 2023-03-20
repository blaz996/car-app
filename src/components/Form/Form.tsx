import React from 'react';

type FormProps = {
  children: React.ReactNode;
  handleSubmit: () => void;
};

export const Form = ({ children, handleSubmit }: FormProps) => {
  return <form onSubmit={handleSubmit}>{children}</form>;
};
