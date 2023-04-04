import React, { useState } from 'react';
import { flowResult } from 'mobx';
import { useNavigate } from 'react-router-dom';

import { Form } from '../Form/Form';
import { Input } from '../Form/Input';
import { Button } from '../Elements/Button';
import { VeichleMakeI } from '../../stores/store';

import '../VeichleForm.scss';

type MakeFormProps = {
  initialState: MakeFormState;
  onSubmit: (make: Omit<VeichleMakeI, 'id'>) => void;
  formType?: string;
};

export type MakeFormState = {
  name: string;
  imageUrl: string;
};

export const MakeForm = ({
  formType = 'add',
  initialState,
  onSubmit,
}: MakeFormProps) => {
  const [formState, setFormState] = useState(initialState);
  const navigate = useNavigate();

  const clearForm = () => {
    setFormState(initialState);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit({
      name: formState.name.toLowerCase(),
      imageUrl: formState.imageUrl,
    });
    if (formType === 'add') {
      clearForm();
    } else {
      navigate('/makes');
    }
  };
  return (
    <div className='veichle-form__container'>
      <h1 className='veichle-form__title'>
        {formType === 'add' ? 'New Make' : 'Edit Make'}
      </h1>
      <div className='veichle-form__content'>
        <div className='veichle-form__img-wrapper'>
          {formState.imageUrl ? (
            <img className='veichle-form__img' src={formState.imageUrl} />
          ) : (
            <p>Make Image</p>
          )}
        </div>

        <Form onSubmit={handleSubmit}>
          <Input
            name='imageUrl'
            label='Make Image URL'
            placeholder='Make Image URL'
            onChange={handleChange}
            value={formState.imageUrl}
          />
          <Input
            required
            name='name'
            label='Make Name'
            placeholder='Make Name'
            onChange={handleChange}
            value={formState.name}
          />
          <Button>Submit</Button>
        </Form>
      </div>
    </div>
  );
};
