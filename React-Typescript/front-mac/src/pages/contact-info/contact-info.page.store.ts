
import {action} from 'mobx';
import {BaseStore, CartDataStore} from '~/stores';

class Store extends BaseStore<ContactInfoPageStore.State> {

  constructor() {
    super({isLoading: false});
  }

  @action
  public async submitData(values: ContactInfoPage.Form.FormValues) {
    this.setState(state => {
      state.isLoading = true;
    });
    CartDataStore.setState(state => {
      state.owner.email = values.email;
      state.owner.phone = values.phone;
    });
    await CartDataStore.update();
    this.setState(state => {
      state.isLoading = false;
    });
  }

}

export const ContactInfoPageStore = new Store();
