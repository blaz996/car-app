import React from 'react';
import './Overlay.scss';

type OverlayProps = {
  shown: boolean;
  children: React.ReactNode;
};

export const Overlay = ({ children, shown }: OverlayProps) => {
  return (
    <div className={`overlay ${shown ? 'overlay--active' : ''}`}>
      {children}
    </div>
  );
};
