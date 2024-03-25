
import {action} from 'mobx';
import {BaseStore, CartDataStore} from '~/stores';

type FromValues = EstablishmentDataPage.Form.FormValues;

class Store extends BaseStore<EstablishmentDataPageStore.State> {

  constructor() {
    super({isLoading: false});
  }

  @action
  public async submitData(values: FromValues): Promise<void> {
    this.setState(state => {
      state.isLoading = true;
    });
    CartDataStore.setState(state => {
      state.establishment.additionalInfo = values.additionalInfo;
      state.establishment.city = values.city;
      state.establishment.name = values.companyName;
      state.establishment.neighborhood = values.neighborhood;
      state.establishment.number = values.number;
      state.establishment.phone = values.establishmentPhone;
      state.establishment.state = values.state;
      state.establishment.street = values.street;
      state.establishment.tradingName = values.tradingName;
      state.establishment.zipCode = values.zipCode;
    });
    await CartDataStore.update();
    this.setState(state => {
      state.isLoading = false;
    });
  }

}

export const EstablishmentDataPageStore = new Store();
