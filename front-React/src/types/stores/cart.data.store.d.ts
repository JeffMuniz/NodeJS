
declare namespace CartDataStore {

  interface Range {
    min: number;
    max: number;
  }

  interface ProductAcceptance {
    acceptance: boolean;
    termsAcceptance: boolean;
  }

  type AcquirerName = 'getnet'
    | 'safrapay'
    | 'cielo'
    | 'stone'
    | 'pag-seguro'
    | 'rede';

  interface State {
    cnpj: string;
    creationDate: Date;
    id: string;
    updateDate: Date;
    owner: {
      cpf: string;
      email: string;
      isConfirmed: boolean;
      name: string;
      phone: string;
    };
    establishment: {
      additionalInfo: string;
      city: string;
      cnpj: string;
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
      dailyMeals: Range;
      diningPlaces: Range;
      fruitOnMenu: boolean;
      servingArea: Range;
    };
    products: {
      vr: ProductAcceptance;
      va: ProductAcceptance;
    };
    acquires: Array<{
      name: AcquirerName;
      affiliationCodes: Array<string>;
    }>;
    bankAccount: {
      bank: string;
      agency: string;
      account: string;
      digit: string;
    };
  }
}
