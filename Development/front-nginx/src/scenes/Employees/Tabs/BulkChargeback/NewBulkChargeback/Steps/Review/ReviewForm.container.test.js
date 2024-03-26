import React from "react";
import TestRenderer from "react-test-renderer";

import { FormContainer } from "./ReviewForm.container";

const props = {
  goBack: jest.fn(),
  openModal: jest.fn(),
  closeModal: jest.fn(),
  goBackDetails: jest.fn(),
  chargeback: {},
  errors: {
    cpfs: {},
  },
  openConfirmationModal: jest.fn(),
};

const values = {
  cpfs: [
    {
      cpf: "54485349535",
      id: 5969,
      isInvalidFromApi: false,
      isValid: true,
      name: "Anna Ferreira Ribeiro",
      produtos: [
        { produto: "VR", valor_solicitado: 1.2 },
        { produto: "VA", valor_solicitado: 10 },
      ],
      reason: "Fraude",
      reasonKey: "FRAUDE",
      va: "R$ 10,00",
      vr: "R$ 1,20",
    },
    {
      cpf: "97367533010",
      id: 10943,
      isInvalidFromApi: false,
      isValid: true,
      name: "Brenner Principe",
      produtos: [
        { produto: "VR", valor_solicitado: 0 },
        { produto: "VA", valor_solicitado: 11.11 },
      ],
      reason: "Fraude",
      reasonKey: "FRAUDE",
      va: "R$ 11,11",
      vr: undefined,
    },
    {
      cpf: "97367533011",
      id: 10944,
      isInvalidFromApi: false,
      isValid: false,
      name: "Teste",
      produtos: [],
      reason: "Fraude",
      reasonKey: "FRAUDE",
      va: undefined,
      vr: undefined,
    },
  ],
};

describe("ReviewForm", () => {
  it("Render Review Form", async () => {
    const testRenderer = TestRenderer.create(<FormContainer {...props} />);
    const testInstance = testRenderer.root;
    const formInstance = testInstance.findByType(FormContainer).instance;

    formInstance.onClickSubmitHandler(values);

    formInstance.openConfirmationModal(values);

    const tree = testRenderer.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
