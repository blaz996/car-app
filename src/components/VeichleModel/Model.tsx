import { observer } from 'mobx-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { flowResult } from 'mobx';

import { Button } from '../Elements/Button';
import { FilterT } from '../../common/types';
import { Modal } from '../Elements/Modal';
import { VeichleCard } from '../VeichleCard';

import { useVeichleStore } from '../../common/hooks/useVeichleStore';
import { useDisclosure } from '../../common/hooks/useDisclosure';

import './ModelPreview.scss';
import { VeichleModelI } from '../../stores/store';

type ModelProps = {
  model: VeichleModelI;
};

export const Model = observer(({ model }: ModelProps) => {
  const {
    open: openModal,
    close: closeModal,
    isOpen: isModalOpen,
  } = useDisclosure();
  const { removeModel, fetchModel } = useVeichleStore();
  const navigate = useNavigate();

  const deleteModel = async () => {
    await removeModel(model.id);
    closeModal();
  };

  const onClick = () => {
    fetchModel(model.id);
    navigate(`${model.id}`);
  };

  const handleEdit = () => {
    fetchModel(model.id);
    navigate(`${model.id}/editModel`);
  };

  return (
    <>
      <Modal shown={isModalOpen} modalTitle={`Remove ${model.name}`}>
        <Modal.Body>
          <p>Are you sure you wish to remove this model?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='red' onClick={deleteModel}>
            Delete
          </Button>
          <Button onClick={closeModal}> Cancel</Button>
        </Modal.Footer>
      </Modal>
      <VeichleCard
        content={model}
        handleClick={onClick}
        handleDelete={openModal}
        handleEdit={handleEdit}
      />
    </>
  );
});
