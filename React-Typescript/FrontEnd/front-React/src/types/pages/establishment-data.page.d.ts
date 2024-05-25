
declare namespace EstablishmentDataPage {
  namespace Form {
    interface FormValues {
      // Identity
      companyName: string;
      tradingName: string;
      establishmentPhone: string;

      // Address
      additionalInfo: string;
      city: string;
      neighborhood: string;
      number: string;
      state: string;
      street: string;
      zipCode: string;
    }

    namespace Identity { }

    namespace Address { }

  }
}
