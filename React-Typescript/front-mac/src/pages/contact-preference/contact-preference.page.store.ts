
import {BaseStore} from '~/stores';

type PreferredMedium = ContactPreferencePage.Form.PreferredMedium;

class Store extends BaseStore<ContactPreferencePageStore.State> {

  constructor() {
    super({
      isLoading: false,
    });
  }

  public async sendCode(preferredMedium: PreferredMedium) {
    this.setState(state => {
      state.isLoading = true;
    });
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.setState(state => {
      state.isLoading = false;
    });
  }

}

export const ContactPreferencePageStore = new Store();
