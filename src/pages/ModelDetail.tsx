import React, { useEffect } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useRootStore } from '../common/hooks/useRootStore';
import { Spinner } from '../components/Elements/Spinner';
import { Button } from '../components/Elements/Button';
import { Modal } from '../components/Elements/Modal';
import { useDisclosure } from '../common/hooks/useDisclosure';

import './ModelDetail.scss';

export const ModelDetail = observer(() => {
  const navigate = useNavigate();
  const {
    open: openModal,
    close: closeModal,
    isOpen: isModalOpen,
  } = useDisclosure();
  const { modelsStore } = useRootStore();
  const { model } = modelsStore;

  const deleteModel = async () => {
    await modelsStore.deleteModel(model.id);
    closeModal();
    navigate('/models');
  };

  if (modelsStore.modelStatus === 'loading') {
    return <Spinner size='large' />;
  }

  if (modelsStore.modelStatus === 'error') {
    return <h1 className='model__error'>Error Fetching Model</h1>;
  }
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
      <div className='model-detail__container'>
        <h3 className='model-detail__title'>Model Details</h3>
        <div className='model-detail'>
          <div className='model-detail__img-container'>
            {model.imageUrl ? (
              <img src={model.imageUrl} className='model-detail__img' />
            ) : (
              <h1 className='model-detail--no-img'>No Image Avilable</h1>
            )}
          </div>

          <div className='model-detail__info-container'>
            <div className='model-detail__info-list'>
              <p className='model-detail__info'>
                <p className='model-detail__info-label'>Make</p>
                <p className='model-detail__info-value'>
                  {modelsStore.currModelMakeName}
                </p>
              </p>
              <p className='model-detail__info'>
                <p className='model-detail__info-label'>Model</p>
                <p className='model-detail__info-value'>{model.name}</p>
              </p>
              <p className='model-detail__info'>
                <p className='model-detail__info-label'>Model Year</p>
                <p className='model-detail__info-value'>{model.year}</p>
              </p>
              <p className='model-detail__info'>
                <p className='model-detail__info-label'>Model Price</p>
                <p className='model-detail__info-value'>{model.price}</p>
              </p>
              <p className='model-detail__info'>
                <p className='model-detail__info-label'>Model Type</p>
                <p className='model-detail__info-value'>{model.type}</p>
              </p>

              <div className='model-detail__info-buttons'>
                <Link to='editModel'>
                  <Button size='large'>Edit Model</Button>
                </Link>
                <Button size='large' onClick={openModal}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
