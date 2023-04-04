import React from 'react';
import { useDisclosure } from '../../common/hooks/useDisclosure';
import { useNavigate } from 'react-router-dom';

import { Modal } from '../Elements/Modal';
import { Button } from '../Elements/Button';

import { useVeichleStore } from '../../common/hooks/useVeichleStore';
import { VeichleCard } from '../VeichleCard';

import { VeichleMakeI } from '../../stores/store';
import { ToggleFilter } from '../../common/utils/Filter';

export const Make = ({ make }: { make: VeichleMakeI }) => {
  const navigate = useNavigate();
  const { addFilter, fetchMake, removeMake, deleteModels } = useVeichleStore();
  const {
    open: openModal,
    close: closeModal,
    isOpen: isModalOpen,
  } = useDisclosure();

  const onClick = () => {
    const currFilter = new ToggleFilter('makeId', make.id, 'brand');
    addFilter(currFilter);
    navigate('/models');
  };

  const deleteMake = async () => {
    await removeMake(make.id);
    closeModal();
  };

  const handleEdit = () => {
    fetchMake(make.id);
    navigate(`${make.id}/editMake`);
  };

  return (
    <>
      <Modal shown={isModalOpen} modalTitle={`Remove ${make.name}`}>
        <Modal.Body>
          <p>
            This will remove all the models associated with this make as well!
            Are you sure you wish to remove this make?{' '}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='red' onClick={deleteMake}>
            Delete
          </Button>
          <Button onClick={closeModal}> Cancel</Button>
        </Modal.Footer>
      </Modal>

      <VeichleCard
        handleDelete={openModal}
        content={make}
        handleEdit={handleEdit}
        handleClick={onClick}
        variant='make'
      />
    </>
  );
};
