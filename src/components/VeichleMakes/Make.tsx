import React from 'react';
import { useDisclosure } from '../../common/hooks/useDisclosure';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react';

import { Modal } from '../Elements/Modal';
import { Button } from '../Elements/Button';

import { useRootStore } from '../../common/hooks/useRootStore';
import { VeichleCard } from '../VeichleCard';

import { VeichleMakeI } from '../../stores/makesStore';
import { ToggleFilter } from '../../common/utils/filter';

export const Make = observer(({ make }: { make: VeichleMakeI }) => {
  const navigate = useNavigate();
  const { makesStore, modelsStore } = useRootStore();

  const {
    open: openModal,
    close: closeModal,
    isOpen: isModalOpen,
  } = useDisclosure();

  const onClick = () => {
    const currFilter = new ToggleFilter({
      property: 'makeId',
      value: make.id,
      label: make.name,
      category: 'brand',
    });
    modelsStore.filtersService.toggleFilter(currFilter);
    navigate('/models');
  };

  const deleteMake = async () => {
    await makesStore.deleteMake(make.id);
    closeModal();
  };

  const handleEdit = () => {
    makesStore.fetchMake(make.id);
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
          <Button
            disabled={makesStore.isDeleting}
            variant='red'
            onClick={deleteMake}
          >
            Delete
          </Button>
          <Button disabled={makesStore.isDeleting} onClick={closeModal}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>

      <VeichleCard
        handleDelete={openModal}
        content={make}
        handleEdit={handleEdit}
        handleClick={onClick}
        variant='make'
        buttonText='View Models'
      />
    </>
  );
});
