import { observer } from 'mobx-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { GoTrashcan } from 'react-icons/go';
import { FiEdit } from 'react-icons/fi';

import { Button } from './Elements/Button';

import './VeichleCard.scss';

type VeichleCardProps = {
  content: { name: string; imageUrl: string; id: string };
  handleDelete: () => void;
  handleEdit: () => void;
  handleClick: () => void;
  buttonText: string;
  variant?: string;
};

export const VeichleCard = observer(
  ({
    content,
    handleDelete,
    handleEdit,
    handleClick,
    variant,
    buttonText,
  }: VeichleCardProps) => {
    const { name, imageUrl, id } = content;
    return (
      <div
        className={`veichle-card ${variant ? `veichle-card__${variant}` : ''}`}
      >
        <button
          onClick={handleDelete}
          className='veichle-card__btn veichle-card__remove'
        >
          <GoTrashcan />
        </button>

        <button
          onClick={handleEdit}
          className='veichle-card__btn veichle-card__edit'
        >
          <FiEdit />
        </button>

        <div className='veichle-card__head'>
          {imageUrl ? (
            <img className='veichle-card__img' src={imageUrl} alt='' />
          ) : (
            <h3 className='veichle-card__img--empty'>No image avilable</h3>
          )}
        </div>
        <div className='veichle-card__body'>
          <p className='veichle-card__name'>{name}</p>
        </div>
        <Button onClick={handleClick} size='large'>
          {buttonText}
        </Button>
      </div>
    );
  }
);
