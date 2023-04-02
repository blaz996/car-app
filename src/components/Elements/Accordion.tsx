import React from 'react';
import { useDisclosure } from '../../common/hooks/useDisclosure';

import './Accordion.scss';

type ModalProps = {
  accordionTitle: string;
  children: React.ReactNode;
  variant?: string;
};

export const Accordion = ({ accordionTitle, children }: ModalProps) => {
  const { isOpen: isModalOpen, toggle: toggleModal } = useDisclosure();
  return (
    <div className='accordion'>
      <div className='accordion__header'>
        <p className='accordion__title'>{accordionTitle}</p>
        <button onClick={toggleModal} className='accordion__toggle'>
          {isModalOpen ? '-' : '+'}
        </button>
      </div>
      <div
        className={`accordion__body ${
          isModalOpen ? 'accordion__body--shown' : 'accordion__body--hidden'
        }`}
      >
        {children}
      </div>
    </div>
  );
};
