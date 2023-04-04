import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useVeichleStore } from '../../common/hooks/useVeichleStore';
import { Spinner } from '../Elements/Spinner';
import { Button } from '../Elements/Button';
import { Modal } from '../Elements/Modal';
import { useDisclosure } from '../../common/hooks/useDisclosure';

import './ModelDetail.scss';

export const ModelDetail = observer(() => {
  const navigate = useNavigate();
  const {
    open: openModal,
    close: closeModal,
    isOpen: isModalOpen,
  } = useDisclosure();

  const veichleStore = useVeichleStore();
  const deleteModel = async () => {
    await veichleStore.removeModel(veichleStore.currModel.id);
    closeModal();
    navigate('/models');
  };

  if (veichleStore.currModelStatusIsLoading) {
    return <Spinner size='large' />;
  } else {
    return (
      <>
        <Modal
          shown={isModalOpen}
          modalTitle={`Remove ${veichleStore.currModel.name}`}
        >
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
              <img
                src={veichleStore.currModel.imageUrl}
                className='model-detail__img'
              />
            </div>
            <div className='model-detail__info-container'>
              <div className='model-detail__info-list'>
                <p className='model-detail__info'>
                  <p className='model-detail__info-label'>Make</p>
                  <p className='model-detail__info-value'>
                    {veichleStore.getMakeName(veichleStore.currModel.makeId)}
                  </p>
                </p>
                <p className='model-detail__info'>
                  <p className='model-detail__info-label'>Model</p>
                  <p className='model-detail__info-value'>
                    {veichleStore.currModel.name}
                  </p>
                </p>
                <p className='model-detail__info'>
                  <p className='model-detail__info-label'>Model Year</p>
                  <p className='model-detail__info-value'>
                    {veichleStore.currModel.year}
                  </p>
                </p>
                <p className='model-detail__info'>
                  <p className='model-detail__info-label'>Model Price</p>
                  <p className='model-detail__info-value'>
                    {veichleStore.currModel.price}
                  </p>
                </p>
                <p className='model-detail__info'>
                  <p className='model-detail__info-label'>Model Type</p>
                  <p className='model-detail__info-value'>
                    {veichleStore.currModel.type}
                  </p>
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
  }
});
