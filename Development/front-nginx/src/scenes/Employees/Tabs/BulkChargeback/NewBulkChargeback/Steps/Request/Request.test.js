import React from "react";
import TestRenderer from "react-test-renderer";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import RequestContainer from "./Request";

const mockStore = configureStore([]);
const store = mockStore({
  voucher: {
    reason: {
      payload: [
        {
          id: 0,
          name: "Demissão",
          label: "Demissão",
          value: "Demissão",
          key: 0,
          description: "Demissão",
        },
        {
          id: 1,
          name: "Erro Operacional",
          label: "Erro Operacional",
          value: "Erro Operacional",
          key: 1,
          description: "Erro Operacional",
        },
        {
          id: 2,
          name: "Óbito",
          label: "Óbito",
          value: "Óbito",
          key: 2,
          description: "Óbito",
        },
        {
          id: 3,
          name: "Fraude",
          label: "Fraude",
          value: "Fraude",
          key: 3,
          description: "Fraude",
        },
      ],
    },
  },
  chargeBack: {
    chargebackEmployee: {},
  },
});

jest.mock("./RequestForm.container", () => "RequestForm");

const defaultProps = {
  goForward: jest.fn(),
  goBack: jest.fn(),
};

describe("NewBulkChargeback - RequestContainer", () => {
  let testRenderer;
  let testInstance;

  beforeEach(() => {
    testRenderer = TestRenderer.create(
      <Provider store={store}>
        <RequestContainer {...defaultProps} />
      </Provider>,
    );

    testInstance = testRenderer.root;
  });

  it("Should be RequestForm and Button is disabled", () => {
    expect(
      testInstance.findByProps({ id: "form-request-header-title" }).props
        .children,
    ).toEqual("Nova solicitação");

    expect(
      testInstance.findByProps({ id: "form-request-header-subtitle" }).props
        .children,
    ).toEqual(
      "Selecione o motivo do estorno, os CPFs dos funcionários e nos próximos passos poderá escolher tipo de macefício e os valores.",
    );
  });
});
