
import {
 action, makeObservable, observable,
} from 'mobx';
import {
 clearPersistedStore, isPersisting, makePersistable, pausePersisting, startPersisting,
} from 'mobx-persist-store';

import { deepClone } from '~/utils';

export abstract class BaseStore<State> {

  private initialState: State;

  @observable
  public state: State;

  get persistenceStatus() {
    return isPersisting(this);
  }

  constructor(state: State, options: BaseStore.Options = {
    persistence: null,
  }) {
    this.initialState = deepClone(state);
    this.state = state;

    makeObservable(this);
    if(options.persistence) {
      const { key, storage, expiresIn } = options.persistence;

      makePersistable(this, {
        name: key,
        storage,
        properties: [ 'state' ],
        expireIn: expiresIn,
        // debugMode: process.env.NODE_ENV === 'development',
      });
    }
  }

  @action
  public resetState(): void {
    this.setStateObject(deepClone(this.initialState));
  }

  @action
  public setStateObject(state: State): void {
    Object.keys(this.state).forEach(key => {
      const value = state[key as keyof State];
      if(value === undefined) return;
      this.state[key as keyof State] = value;
    });
  }

  @action
  public setState(callback: (state: State) => void) {
    callback(this.state);
  }

  public startPersistence(): void {
    startPersisting(this);
  }

  public pausePersistence(): void {
    pausePersisting(this);
  }

  public async clearPersistedData(): Promise<void> {
    await clearPersistedStore(this);
  }

}
