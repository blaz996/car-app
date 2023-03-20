import { autorun, makeAutoObservable, toJS } from 'mobx';
import axios from 'axios';

import { SortValue } from '../common/types';
/*
class Friend {
  constructor(public id: number, public name: string, public email: string) {
    makeAutoObservable(this);
  }
}

class FriendStore {
  status = '';
  friends: Friend[] = [];

  get isLoading() {
    return this.status === 'pending';
  }

  constructor() {
    makeAutoObservable(this);
  }

  *fetchFriends() {
    this.status = 'pending';
    try {
      const { data } = yield axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );
      console.log(data);

      this.friends = data.map(
        ({ name, email, id }: Friend) => new Friend(id, name, email)
      );
      this.status = 'success';
      console.log(toJS(this.friends));
    } catch (err) {
      this.status = 'error';
    }
  }
}

export const friendsStore = new FriendStore();
*/

class VeichleMake {
  id: number;

  generateId() {
    return Math.floor(Math.random() * 1000000 + 1);
  }
  constructor(public name: string) {
    this.name = name;
    this.id = this.generateId();
  }
}

class VeichleModel extends VeichleMake {
  constructor(
    public makeName: string,
    public name: string,
    public makeId: number,
    public price: number,
    public year: number
  ) {
    super(makeName);
    this.name = name;
    this.makeId = this.id;
    this.id = this.generateId();
    this.price = price;
    this.year = year;
  }
}

class VeichleStore {
  public veichleModels: VeichleModel[] = [];
  public veichleMake: VeichleMake[] = [];
  public filters: string[] = [];
  public sortValue: SortValue = {} as SortValue;
  private readonly status: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  *fetchVeichleModels() {}

  *addVeichle() {}

  *editVeichle() {}

  *removeVeichle() {}
}

const veichleStore = new VeichleStore();
