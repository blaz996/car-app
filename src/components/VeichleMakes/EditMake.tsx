import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';

import { Spinner } from '../Elements/Spinner';

import { MakeForm } from './MakeForm';
import { VeichleMakeI } from '../../stores/store';

import { useVeichleStore } from '../../common/hooks/useVeichleStore';

export const EditMake = observer(() => {
  const { makeId: currMakeId } = useParams();
  const { fetchMake, currMake, makesStatus, applyMakeEdit } = useVeichleStore();

  useEffect(() => {
    fetchMake(currMakeId as string);
  }, [currMakeId]);

  const editMakeSubmit = (editedMake: Omit<VeichleMakeI, 'id'>) => {
    const updatedMake: any = {};
    let prop: keyof typeof currMake;
    for (prop in currMake) {
      if (prop === 'id') continue;
      if (currMake[prop] === editedMake[prop]) continue;
      updatedMake[prop] = editedMake[prop];
    }
    applyMakeEdit(currMakeId as string, updatedMake);
  };

  if (makesStatus === 'loading') {
    return <Spinner size='large' />;
  }
  if (makesStatus === 'error') {
    return <h1>Error fetching make</h1>;
  } else {
    const intialState = {
      ...currMake,
    };
    return (
      <MakeForm
        formType='edit'
        onSubmit={editMakeSubmit}
        initialState={intialState}
      />
    );
  }
});
