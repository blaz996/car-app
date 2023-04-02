import React from 'react';
import { Link } from 'react-router-dom';

import { Input } from '../Form/Input';
import { Button } from '../Elements/Button';
import { MakeList } from './MakesList';

import './Makes.scss';

export const Makes = () => {
  return (
    <div className='makes__container'>
      <div className='makes__header '>
        <Input
          variant='makes__search-filter'
          placeholder='&#128269; Search Makes'
        />
        <Link to='addMake'>
          <Button size='large'>Add Make</Button>
        </Link>
      </div>
      <MakeList />
    </div>
  );
};
