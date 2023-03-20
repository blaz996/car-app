import React, { useState } from 'react';
import { Input } from '../components/Form/Input';
import { Select } from '../components/Form/Select';
import { Modal } from '../components/Elements/Modal';
import { veichleFilters } from '../common/data/veichleData';

const HomePage = () => {
  const [veichleSearchValue, setVeichleSearchValue] = useState('');

  const handleVeichleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVeichleSearchValue(e.target.value);
  };

  return (
    <div className='veichle-list__container'>
      <div className='veichle-list__header'>
        <div className='veichle-list__search-filter'>
          <Input onChange={handleVeichleSearch} />
        </div>
        <div className='veichle-list__sort'>
          <Select
            label='Sort by:'
            options={[
              { label: 'Audi', value: 'audi' },
              { label: 'BMW', value: 'bmw' },
              { label: 'Citroen', value: 'citroen' },
            ]}
          />
        </div>
      </div>
      <div className='veichle-list__sidebar'>
        <div className='veichle-list__filters'>
          {veichleFilters.map((filter) => (
            <h1>Filter</h1>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
