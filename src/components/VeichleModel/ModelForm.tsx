import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { Form } from '../Form/Form';
import { Input } from '../Form/Input';
import { Select } from '../Form/Select';
import { Button } from '../Elements/Button';
import { MODELS_TYPES } from '../../common/utils/data';

import { useVeichleStore } from '../../common/hooks/useVeichleStore';

import { useNavigate } from 'react-router-dom';

import { observer } from 'mobx-react';

import { VeichleModelI } from '../../stores/store';
import { FiPrinter } from 'react-icons/fi';
import { GiSilverBullet } from 'react-icons/gi';

import '../VeichleForm.scss';

export type ModelFormState = {
  name: string;
  imageUrl: string;
  modelMake: string;
  price: string;
  year: string;
  type: string;
};

type ModelFormProps = {
  formType?: string;
  initalState: ModelFormState;
  onSubmit: (model: Omit<VeichleModelI, 'id'>) => void;
};

export const ModelForm = observer(
  ({ formType = 'add', initalState, onSubmit }: ModelFormProps) => {
    const { makes, getVeichleMakeId, removeMake } = useVeichleStore();

    const navigate = useNavigate();

    const [formState, setFormState] = useState(initalState);

    const selectOptions = makes.map((model) => ({
      value: model.name,
      label: model.name,
    }));

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
      const { value, name } = e.target;
      setFormState((oldState) => ({ ...oldState, [name]: value }));
    };

    const clearForm = () => {
      setFormState(initalState);
    };

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
      e.preventDefault();
      const { modelMake, ...submitedModel } = formState;
      const makeId = getVeichleMakeId(modelMake);
      onSubmit({
        name: submitedModel.name.toLowerCase(),
        imageUrl: submitedModel.imageUrl,
        type: submitedModel.type,
        year: +submitedModel.year,
        price: +submitedModel.price,
        makeId,
      });
      if (formType === 'add') {
        clearForm();
      } else {
        navigate('/models');
      }
    };
    return (
      <div className='veichle-form__container'>
        <h1 className='veichle-form__title'>
          {formType === 'add' ? 'New Model' : 'Edit Model'}
        </h1>
        <div className='veichle-form__content'>
          <div className='veichle-form__img-wrapper'>
            {formState.imageUrl ? (
              <img className='veichle-form__img' src={formState.imageUrl} />
            ) : (
              <p>Model Image</p>
            )}
          </div>
          <Form onSubmit={handleSubmit}>
            <Select
              required
              name='modelMake'
              placeholder='Select a brand'
              options={selectOptions}
              label='Model brand'
              value={formState.modelMake}
              onChange={handleChange}
            />

            <Input
              name='imageUrl'
              label='Model Image URL'
              placeholder='Model Image URL'
              value={formState.imageUrl}
              onChange={handleChange}
            />

            <Input
              required
              name='name'
              label='Model name'
              placeholder='Model name'
              value={formState.name}
              onChange={handleChange}
            />
            <Input
              required
              type='number'
              name='year'
              label='Model year'
              placeholder='Model year'
              value={formState.year}
              onChange={handleChange}
            />
            <Input
              required
              type='number'
              name='price'
              label='Model Price'
              placeholder='Model Price'
              value={formState.price}
              onChange={handleChange}
            />
            <Select
              name='type'
              options={MODELS_TYPES.map((type) => ({ label: type }))}
              defaultValue='Select a type'
              label='Model Type'
              value={formState.type}
              onChange={handleChange}
            />

            <Button size='large' type='submit'>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
);
