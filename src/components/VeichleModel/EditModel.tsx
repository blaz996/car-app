import React from 'react';
import { useParams } from 'react-router-dom';

import { useVeichleStore } from '../../common/hooks/useVeichleStore';

import { Spinner } from '../Elements/Spinner';
import { observer } from 'mobx-react';

import { ModelForm, ModelFormState } from './ModelForm';
import { VeichleModelI } from '../../stores/store';

export const EditModel = observer(() => {
  const { modelId: currModelId } = useParams();
  const { getMakeName, applyModelEdit, currModel, currModelStatusIsLoading } =
    useVeichleStore();

  const editModelSubmit = (editedModel: Omit<VeichleModelI, 'id'>) => {
    const updatedModel: any = {};
    let prop: keyof typeof currModel;
    for (prop in currModel) {
      if (prop === 'id') continue;
      if (currModel[prop] === editedModel[prop]) continue;
      updatedModel[prop] = editedModel[prop];
    }
    applyModelEdit(currModelId as string, updatedModel);
  };

  if (currModelStatusIsLoading) {
    return <Spinner />;
  }

  return (
    <ModelForm
      formType='edit'
      onSubmit={editModelSubmit}
      initalState={{
        name: currModel.name,
        imageUrl: currModel.imageUrl,
        modelMake: getMakeName(currModel.makeId),
        year: currModel.year.toString(),
        price: currModel.price.toString(),
        type: currModel.type,
      }}
    />
  );
});
/*
  <ModelForm
    formType='edit'
    onSubmit={editModelSubmit}
    initalState={}
  />;
  */
