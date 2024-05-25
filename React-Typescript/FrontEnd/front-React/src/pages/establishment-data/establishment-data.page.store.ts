
import { BaseStore } from '~/stores';

class Store extends BaseStore<{ }> {

  constructor() {
    super({ });
  }

}

export const EstablishmentDataPageStore = new Store();
