export default [
  {
    invoiceId: 112124,
    cnpj: "54.143.681/0555-82",
    amount: "R$ 150.500,55",
    dueDate: "27/07/2021",
    unificationType: "VA/VR",
    status: "Em aberto",
    totalOrders: 33,
  },
  {
    invoiceId: 109537,
    cnpj: "13.055.230/1196-87",
    amount: "R$ 203.970,00",
    dueDate: "01/0/2021",
    unificationType: "Por produto",
    status: "Pagamento Confirmado",
    totalOrders: 47,
  },
  {
    invoiceId: 112198,
    cnpj: "54.143.681/0555-82",
    amount: "R$ 98.468,00",
    dueDate: "05/08/2021",
    unificationType: "Por produto",
    status: "Cancelado",
    totalOrders: 24,
  },
];

export const invoiceDetailUnifiedMock = {
  idFatura: 112124,
  qtdPedidos: 3,
  cnpjPagador: "54143681055582",
  razaoSocialPagador: "mac Teste",
  dataVencimento: "2021-07-27",
  tipoUnificacao: "UNIFICADO_VA",
  formaPagamento: "CONTA_VIRTUAL",
  statusFatura: "PENDENTE_PROCESSAMENTO",
  macAlimen: 100000,
  macRefei: 50500.55,
  desconto: 10.3,
  rebate: 4.15,
  valorTotal: 150500.55,
  emissaoDocumentoZerado: true,
  statusNotaFiscal: "PENDENTE",
  disponibilizacaoNotaFiscal: "2021-05-06",
};

export const ordersByInvoiceMock = {
  cargasPedidos: [
    {
      idPedido: 123,
      idCarga: 123,
      cnpj: "47503891000162",
      dataPedido: "2021-03-12",
      dataCredito: "2021-03-13",
      valorTotal: 5.15,
      qtdFuncionarios: 2,
    },
    {
      idPedido: 124,
      idCarga: 124,
      cnpj: "47503891000163",
      dataPedido: "2021-03-12",
      dataCredito: "2021-03-13",
      valorTotal: 5.15,
      qtdFuncionarios: 2,
    },
  ],
  meta: {
    total: 2,
  },
};
