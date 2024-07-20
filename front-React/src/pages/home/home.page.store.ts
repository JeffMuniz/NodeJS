
import { BaseStore } from '~/stores';

class Store extends BaseStore<HomePageStore.State> {
  constructor() {
    super({ });
  }
}

export const HomePageStore = new Store();
