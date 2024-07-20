
declare namespace PATQuestionsPage {

  interface RouteMatchParams {
    type: 'vr' | 'va' | 'vr-va';
    question: string;
  }

  interface StoreState {
    step: '01' | '02' | '03' | '04' | '05';
    showTermsModal: boolean;
  }

  interface Form {
    vrAcceptance: 'yes' | 'no';
    vaAcceptance: 'yes' | 'no';
    diningPlaces: '1-30' | '31-60' | '61-99' | '100-or-more';
    dailyServings: '0-100' | '101-200' | '201-299' | '300-or-more';
    servingArea: '0-100' | '101-200' | '201-299' | '300-or-more';
    fruitOnMenu: 'yes' | 'no';
    cashRegisters: '1-30' | '31-60' | '61-99' | '100-or-more';
  }

  namespace TermsModal {

  }
}
