
import { action } from 'mobx';
import { BaseStore } from '~/stores/base/base.store';

class Store extends BaseStore<CartDataStore.State> {

  constructor() {
    super({
      cnpj: null,
      creationDate: null,
      id: null,
      updateDate: null,
      owner: null,
      establishment: null,
      patQuestions: null,
      products: null,
      acquires: null,
      bankAccount: null,
    }, {
      persistence: {
        key: 'cart',
        storage: localStorage,
        expiresIn: 1000 * 60 * 60, // 1 hour.
      },
    });
  }

  @action
  public async updateCart(): Promise<void> {

  }

}

export const CartDataStore = new Store();
