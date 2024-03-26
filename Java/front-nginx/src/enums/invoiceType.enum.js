const InvoiceTypeEnum = {
  TED_DOC: {
    description: "TED",
  },
  BOLETO: {
    description: "Boleto",
  },
  DEBITO_EM_CONTA: {
    description: "Débito em conta",
  },
  DESCENTRALIZADO: {
    status: 1,
    description: "Descentralizado",
  },
  CENTRALIZADO: {
    status: 2,
    description: "Centralizado",
  },
  CONTA_VIRTUAL: {
    description: "Conta Virtual",
  },
};

export default InvoiceTypeEnum;
