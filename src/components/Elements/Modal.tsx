import React from 'react';
import { useDisclosure } from '../../common/hooks/useDisclosure';

import './Modal.scss';

type ModalProps = {
  modalTitle: string;
  children: React.ReactNode;
};

export const Modal = ({ modalTitle, children }: ModalProps) => {
  const { isOpen: isModalOpen, toggle: toggleModal } = useDisclosure();
  return (
    <div className='modal'>
      <div className='modal__header'>
        <p className='modal__title'>{modalTitle}</p>
        <button onClick={toggleModal} className='modal__toggle'>
          {isModalOpen ? '-' : '+'}
        </button>
      </div>
      <div className={`modal__body ${isModalOpen ? 'modal__body--shown' : ''}`}>
        {children}
      </div>
    </div>
  );
};
