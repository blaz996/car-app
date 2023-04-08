import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react';

import { Spinner } from '../components/Elements/Spinner';

import { MakeForm } from '../components/VeichleMakes/MakeForm';
import { VeichleMakeI } from '../stores/makesStore';

import { useRootStore } from '../common/hooks/useRootStore';

export const EditMake = observer(() => {
  const { makeId } = useParams();
  const { makesStore } = useRootStore();
  const { make } = makesStore;

  const editMakeSubmit = (editedMake: Omit<VeichleMakeI, 'id'>) => {
    const updatedMake: any = {};
    let prop: keyof typeof make;
    for (prop in make) {
      if (prop === 'id') continue;
      if (make[prop] === editedMake[prop]) continue;
      updatedMake[prop] = editedMake[prop];
    }
    makesStore.editMake(makeId as string, updatedMake);
  };

  if (makesStore.makeStatus === 'loading') {
    return <Spinner size='large' />;
  }
  if (makesStore.makeStatus === 'error') {
    return <h1>Error Fetching Make</h1>;
  } else {
    const intialState = {
      ...make,
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
