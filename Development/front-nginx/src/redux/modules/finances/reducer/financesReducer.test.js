import financesReducer, {
  GET_INVOICES_COMPLETED,
  SELECT_INVOICE,
} from "./financesReducer";

jest.mock("../actions/fetchInvoices");

const mock = [
  {
    idPedido: "1",
    dataPedido: "01/01/2021",
    totalPedido: 4214.24,
    qtdNotas: 32,
    notas: [
      {
        dataEmissao: "01/01/2021",
        numero: "4284124214124214",
        solicitante: "mac",
        valor: 4214.24,
        idRPS: "",
        chaveAcessoNF: "52151252512515",
      },
    ],
  },
];

describe("Finances Reducer - Unit Tests", () => {
  it("Should return invoices when GET_INVOICES_COMPLETED gets triggered", () => {
    // given
    const action = { type: GET_INVOICES_COMPLETED, payload: mock };
    // when
    const result = financesReducer(null, action);
    const expectResult = {
      invoices: {
        data: mock,
        error: null,
        requestStatus: "success",
      },
    };

    // then
    expect(result).toMatchObject(expectResult);
  });

  it("Should select invoice when SELECT_INVOICE gets triggered", () => {
    // eslint-disable-next-line prefer-destructuring
    const invoice = mock[0];
    const action = { type: SELECT_INVOICE, payload: invoice };
    // when
    const result = financesReducer(null, action);
    // then
    expect(result).toMatchObject({ selectedInvoice: invoice });
  });

  it("Should clear selected invoice when SELECT_INVOICE gets triggered from clearInvoice action", () => {
    const invoice = {};
    const action = { type: SELECT_INVOICE, payload: invoice };
    // when
    const result = financesReducer(null, action);
    // then
    expect(result).toMatchObject({ selectedInvoice: invoice });
  });
});
