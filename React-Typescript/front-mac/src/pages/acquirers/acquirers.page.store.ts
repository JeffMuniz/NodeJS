
import {action} from 'mobx';
import {BaseStore} from '~/stores';
import {CartDataStore} from '~/stores';

type OptionsFormValues = AcquirersPage.Options.FormValues;
type OptionConfigFormValues = AcquirersPage.OptionConfig.Form.FormValues;

class Store extends BaseStore<AcquirersPageStore.State> {

  constructor() {
    super({
      acquirer: null,
      isLoading: false,
    });
  }

  @action
  public async submitSelectedOptions(values: OptionsFormValues): Promise<void> {
    CartDataStore.setState(state => {
      state.acquirers = values.acquirers.map(a => ({
        name: a,
        affiliationCodes: [ ],
      }));
    });
  }

  @action
  public async submitAffiliationCodes(values: OptionConfigFormValues): Promise<void> {
    this.setState(state => {
      state.isLoading = true;
    });
    CartDataStore.setState(state => {
      const index = state.acquirers.findIndex(a => {
        return a.name === this.state.acquirer;
      });
      state.acquirers[index].affiliationCodes = values.affiliationCodes;
    });
    await CartDataStore.update();
    this.setState(state => {
      state.isLoading = false;
    });
  }

}

export const AcquirersPageStore = new Store();
