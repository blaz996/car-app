import { makeAutoObservable } from 'mobx';
import { axios } from '../../common/lib/axios';
import { VeichleMakeI } from '../MakesStore';
import { VeichleModelI } from '../ModelsStore';

export class ModelsApiService {
  getModels(
    filters: string,
    sort: string,
    currPage: number = 1,
    rpp: number = 10
  ) {
    return axios.get(
      `/resources/VeichleModel/?sort=${sort}${filters}&page=${currPage}&rpp=${rpp}`
    );
  }

  getModel(id: string) {
    return axios.get(`/resources/VeichleModel/${id}`);
  }

  edit(id: string, model: Partial<VeichleModelI>) {
    return axios.patch(`/resources/VeichleModel/${id}`, model);
  }

  delete(id: string) {
    return axios.delete(`/resources/VeichleModel/${id}`);
  }

  deleteAll(makeId: string, models: VeichleModelI[]) {
    return Promise.all(
      models.map((model) => {
        if (model.makeId === makeId) {
          axios.delete(`/resources/VeichleModel/${model.id}`);
        }
      })
    );
  }

  add(model: Omit<VeichleModelI, 'id'>) {
    return axios.post('/resources/VeichleModel', model);
  }
}

export class MakesApiService {
  getMakes(
    filter: string,
    sort: string,
    currPage: number = 1,
    rpp: number = 10
  ) {
    return axios.get(
      `/resources/VeichleMake/?sort=${sort}${filter}&page=${currPage}&rpp=${rpp}`
    );
  }

  getMake(id: string) {
    return axios.get(`/resources/VeichleMake/${id}`);
  }

  add(make: Omit<VeichleMakeI, 'id'>) {
    return axios.post('/resources/VeichleMake', make);
  }

  edit(id: string, make: Partial<VeichleMakeI>) {
    return axios.patch(`/resources/VeichleMake/${id}`, make);
  }

  delete(id: string) {
    return axios.delete(`/resources/VeichleMake/${id}`);
  }
}
