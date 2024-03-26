import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import ChargeBackDetails from "./ChargeBackDetails";

jest.mock("@base", () => ({
  WithPagination: "WithPagination",
  ContainerWrapper: "ContainerWrapper",
  TableHeader: "TableHeader",
  TableHeaderCol: "TableHeaderCol",
  TableRow: "TableRow",
  TableCol: "TableCol",
  Loading: "Loading",
}));

const defaultProps = {
  getStatus: jest.fn(),
  getReason: jest.fn(),
  selectedCompany: {
    id: 4137,
    name: "Teste",
    value: 4137,
    cnpj: "51940435000157",
    description: "51.940.435/0001-57",
  },
  invoicesRequestStatus: "success",
  getColor: jest.fn(),
  onChangePage: jest.fn(),
  handleTerm: jest.fn(),
  headerClickHandler: jest.fn(),
  chargebackBody: {
    requestStatus: "success",
  },
  detailsHeader: {
    id: 87654322,
    solicitante: "Augusto Monteiro...",
    data_solicitacao: "17/02/2018 16:31",
    valor_solicitado: 2750.0,
    valor_estornado: "",
    motivo: "Erro Operacional",
    quantidade: 10,
    status: "Processando",
    termo_aceite: 234567,
  },
  details: {
    detalhes: [
      {
        id_funcionario: 1,
        funcionario: "Barbara Hellen Antunes Simoes Silva",
        cpf: "12345678912",
        estornos: [
          {
            produto: "VR",
            valor_solicitado: 300.0,
            valor_estornado: 300.0,
          },
          {
            produto: "VA",
            valor_solicitado: 100.0,
            valor_estornado: 100.0,
          },
        ],
      },
      {
        id_funcionario: 2,
        funcionario: "Bruno de Souza-",
        cpf: "12345678913",
        estornos: [
          {
            produto: "VR",
            valor_solicitado: 1,
            valor_estornado: 2,
          },
          {
            produto: "VA",
            valor_solicitado: 3,
            valor_estornado: 4,
          },
        ],
      },
    ],
  },
  chargebackDetails: {
    data: {
      totalItems: 10,
    },
    requestStatus: "success",
  },
};

describe("ChargeBackDetails", () => {
  it("Should render ChargeBackDetails", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<ChargeBackDetails {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
