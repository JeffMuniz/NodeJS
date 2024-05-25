
declare namespace CartDataStore {

  interface Range {
    min: number;
    max: number;
  }

  type AcquirerName = 'getnet'
    | 'safrapay'
    | 'macna'
    | 'stone'
    | 'pag-seguro'
    | 'rede';

  type State = {
    cnpj: string;
    creationDate: Date;
    id: string;
    updateDate: Date;
    owner: {
      cpf: string;
      email: string;
      // isIdentityConfirmed: boolean;
      name: string;
      phone: string;
    };
    establishment: {
      additionalInfo: string;
      city: string;
      name: string;
      neighborhood: string;
      number: string;
      phone: string;
      state: string;
      street: string;
      tradingName: string;
      zipCode: string;
    };
    patQuestions: {
      cashRegisters: Range;
      dailyServings: Range;
      diningPlaces: Range;
      fruitOnMenu: boolean;
      servingArea: Range;
    };
    products: {
      vr: boolean;
      va: boolean;
    };
    termsAcceptance: {
      nutritional: boolean;
      truthfulInfo: boolean;
    };
    acquirers: Array<{
      name: AcquirerName;
      affiliationCodes: Array<string>;
    }>;
    bankAccount: {
      bank: string;
      agency: string;
      account: string;
      digit: string;
    };
  };
}
