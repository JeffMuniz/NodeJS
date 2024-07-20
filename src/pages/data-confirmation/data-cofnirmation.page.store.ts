
import {action} from 'mobx';
import {BaseStore} from '~/stores';
import {CartDataStore} from '~/stores';

type State = DataConfirmationPageStore.State;

class Store extends BaseStore<State> {

  constructor() {
    super({isLoading: false});
  }

  @action
  public async finishOrder(): Promise<void> {
    this.setState(state => {
      state.isLoading = true;
    });
    await CartDataStore.finish();
    this.setState(state => {
      state.isLoading = false;
    });
  }

}

export const DataConfirmationPageStore = new Store();
