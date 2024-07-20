
import {action} from 'mobx';
import {BaseStore, CartDataStore} from '~/stores';

type State = BankAccountPageStore.State;
type FormValues = BankAccountPage.Form.FormValues;

class Store extends BaseStore<State> {

  constructor() {
    super({isLoading: false});
  }

  @action
  public async submitData(values: FormValues): Promise<void> {
    this.setState(state => {
      state.isLoading = true;
    });

    CartDataStore.setState(state => {
      state.bankAccount = {
        account: values.account,
        agency: values.agency,
        bank: values.bank,
        digit: values.digit,
      };
    });

    await CartDataStore.update();

    this.setState(state => {
      state.isLoading = false;
    });
  }

}

export const BankAccountPageStore = new Store();
