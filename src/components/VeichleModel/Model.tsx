import { observer } from 'mobx-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '../Elements/Button';

import { Modal } from '../Elements/Modal';
import { VeichleCard } from '../VeichleCard';
import { useRootStore } from '../../common/hooks/useRootStore';

import { useDisclosure } from '../../common/hooks/useDisclosure';

import './ModelPreview.scss';
import { VeichleModelI } from '../../stores/ModelsStore';

type ModelProps = {
  model: VeichleModelI;
};

export const Model = observer(({ model }: ModelProps) => {
  const {
    open: openModal,
    close: closeModal,
    isOpen: isModalOpen,
  } = useDisclosure();
  const { modelsStore } = useRootStore();

  const navigate = useNavigate();

  const deleteModel = async () => {
    await modelsStore.deleteModel(model.id);
    closeModal();
  };

  const onClick = () => {
    modelsStore.fetchModel(model.id, model.makeId);
    navigate(`${model.id}`);
  };

  const handleEdit = () => {
    modelsStore.fetchModel(model.id, model.makeId);
    navigate(`${model.id}/editModel`);
  };

  return (
    <>
      <Modal shown={isModalOpen} modalTitle={`Remove ${model.name}`}>
        <Modal.Body>
          <p>Are you sure you wish to remove this model?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={modelsStore.isDeleting}
            variant='red'
            onClick={deleteModel}
          >
            Delete
          </Button>
          <Button disabled={modelsStore.isDeleting} onClick={closeModal}>
            {' '}
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
      <VeichleCard
        content={model}
        handleClick={onClick}
        handleDelete={openModal}
        handleEdit={handleEdit}
        buttonText='View Details'
      />
    </>
  );
});
