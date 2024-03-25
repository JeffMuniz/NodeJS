
import {action} from 'mobx';
import {BaseStore} from '~/stores';

type FormValues = IdentityConfirmationPage.Form.FormValues;

class Store extends BaseStore<IdentityConfirmationPageStore.State> {

  constructor() {
    super({
      isLoading: false,
    });
  }

  @action
  public async confirmIdentity(values: FormValues) {
    this.setState(state => {
      state.isLoading = true;
    });

    await new Promise(resolve => setTimeout(resolve, 1000));
    this.setState(state => {
      state.isLoading = false;
    });
  }

}

export const IdentityConfirmationPageStore = new Store();
