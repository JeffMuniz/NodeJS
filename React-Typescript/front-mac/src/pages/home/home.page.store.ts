
import {action} from 'mobx';
import {BaseStore, CartDataStore} from '~/stores';

class Store extends BaseStore<HomePageStore.State> {

  constructor() {
    super({
      isLoading: false,
    });
  }

  @action
  public async recoverCnpjData(cnpj: string): Promise<void> {
    this.setState(state => {
      state.isLoading = true;
    });

    CartDataStore.setState(state => {
      state.cnpj = cnpj;
    });

    await CartDataStore.update();

    this.setState(state => {
      state.isLoading = false;
    });
  }

}

export const HomePageStore = new Store();
