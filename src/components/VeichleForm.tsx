import React from 'react';

import { Form } from './Form/Form';
import { Input } from './Form/Input';

const VeichleForm = () => {
  return (
    <Form handleSubmit={() => null}>
      <Input label='Veichle brand' placeholder='Veichle brand' />
      <Input label='Veichle model' placeholder='Veichle model' />
      <Input label='Veichle price' placeholder='Veichle price' />
      <Input label='Veichle year' placeholder='Veichle year' />
    </Form>
  );
};

export default VeichleForm;
