
import {BaseStore, CartDataStore} from '~/stores';

type State = NameConfirmationPageStore.State;

class Store extends BaseStore<State> {

  constructor() {
    super({
      isLoading: false,
    });
  }

  public async confirmName(name: string, cpf: string): Promise<void> {
    this.setState(state => {
      state.isLoading = true;
    });
    CartDataStore.setState(state => {
      state.owner = {
        ...state.owner,
        name,
        cpf,
      };
    });

    await CartDataStore.update();

    this.setState(state => {
      state.isLoading = false;
    });
  }

}

export const NameConfirmationPageStore = new Store();
