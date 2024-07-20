
import { BaseStore } from '~/stores';

type StoreState = PATQuestionsPage.StoreState;

class Store extends BaseStore<StoreState> {

  constructor() {
    super({
      showTermsModal: false,
      step: '01',
    });
  }

}

export const PATQuestionsPageStore = new Store();
