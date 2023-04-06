import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useRootStore } from '../common/hooks/useRootStore';

import { Spinner } from '../components/Elements/Spinner';
import { observer } from 'mobx-react';

import { ModelForm } from '../components/VeichleModel/ModelForm';
import { VeichleModelI } from '../stores/ModelsStore';

export const EditModel = observer(() => {
  const { modelId } = useParams();
  const { modelsStore, makesStore } = useRootStore();

  useEffect(() => {});

  const editModelSubmit = (editedModel: Omit<VeichleModelI, 'id'>) => {
    const updatedModel: any = {};
    let prop: keyof typeof model;
    for (prop in model) {
      if (prop === 'id') continue;
      if (model[prop] === editedModel[prop]) continue;
      updatedModel[prop] = editedModel[prop];
    }
    modelsStore.editModel(modelId as string, updatedModel);
  };

  if (modelsStore.modelStatus === 'loading' || !modelsStore.currModelMakeName) {
    return <Spinner />;
  }
  if (modelsStore.modelStatus === 'error') {
    return <h1>Error Fetching Model</h1>;
  }
  const { model } = modelsStore;

  return (
    <ModelForm
      formType='edit'
      onSubmit={editModelSubmit}
      initalState={{
        name: model.name,
        imageUrl: model.imageUrl,
        modelMake: modelsStore.currModelMakeName,
        year: model.year.toString(),
        price: model.price.toString(),
        type: model.type,
      }}
    />
  );
});
