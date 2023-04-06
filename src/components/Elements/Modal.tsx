import React from 'react';

import { Overlay } from '../../layouts/Overlay';

import './Modal.scss';

type ModalProps = {
  shown: boolean;
  modalTitle: string;
  children: React.ReactNode;
};

export const Modal = ({ children, modalTitle, shown }: ModalProps) => {
  return (
    <Overlay shown={shown}>
      <div className='modal'>
        <div className='modal__header'>
          <h3 className='modal__title'>{modalTitle}</h3>
        </div>
        {children}
      </div>
    </Overlay>
  );
};

const Body = ({ children }: { children: React.ReactNode }) => {
  return <div className='modal__content'>{children}</div>;
};
const Footer = ({ children }: { children: React.ReactNode }) => {
  return <div className='modal__footer'>{children}</div>;
};

Modal.Body = Body;
Modal.Footer = Footer;
