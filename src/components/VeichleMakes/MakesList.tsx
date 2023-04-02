import React from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

import { useVeichleStore } from '../../common/hooks/useVeichleStore';
import { Input } from '../Form/Input';
import { Button } from '../Elements/Button';
import { Make } from './Make';
import { Spinner } from '../Elements/Spinner';

import './MakesList.scss';

export const MakeList = observer(() => {
  const { makes, makesStatus } = useVeichleStore();

  if (makesStatus === 'loading') {
    return <Spinner size='large' />;
  }
  return (
    <div className='makes-list'>
      <h1 className='list__title'>Veichle Makes</h1>
      <ul className='list'>
        {makes.map((make) => (
          <Make make={make} />
        ))}
      </ul>
    </div>
  );
});
