
import {action} from 'mobx';
import {BaseStore} from '~/stores/base/base.store';
import {deepClone, isEqual} from '~/utils';

class Store extends BaseStore<CartDataStore.State> {

  constructor() {
    super({
      acquirers: [ ],
      bankAccount: {
        account: '',
        agency: '',
        bank: '',
        digit: '',
      },
      cnpj: '',
      creationDate: null,
      establishment: {
        additionalInfo: '7 Andar',
        city: 'São Paulo',
        name: 'Platform Buiders S/A',
        neighborhood: 'Bela Vista',
        number: '1374',
        phone: '11 55555-3498',
        state: 'SP',
        street: 'Av. Paulista',
        tradingName: 'Platform Builders',
        zipCode: '01310-100',
      },
      id: null,
      owner: {
        cpf: '',
        email: '',
        name: '',
        phone: '',
      },
      patQuestions: {
        cashRegisters: {
          max: null,
          min: null,
        },
        dailyServings: {
          max: null,
          min: null,
        },
        diningPlaces: {
          max: null,
          min: null,
        },
        fruitOnMenu: null,
        servingArea: {
          max: null,
          min: null,
        },
      },
      products: {
        vr: null,
        va: null,
      },
      termsAcceptance: {
        nutritional: null,
        truthfulInfo: null,
      },
      updateDate: null,
    }, {
      persistence: {
        key: 'cart',
        storage: localStorage,
        expiresIn: 1000 * 60 * 60, // 1 hour.
      },
    });
  }

  @action
  public async update(): Promise<void> {
    const cleared = this.clearEmptyRootObjects();
    console.log('cleared', cleared);
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  @action
  public async finish(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.resetState();
  }

  private clearEmptyRootObjects(): CartDataStore.State {
    const state = deepClone(this.state);
    Object.keys(state).forEach(k => {
      const prev = (this.initialState as any)[k];
      const next = (state as any)[k];
      if(isEqual(prev, next)) delete (state as any)[k];
    });

    return state;
  }

}

export const CartDataStore = new Store();
