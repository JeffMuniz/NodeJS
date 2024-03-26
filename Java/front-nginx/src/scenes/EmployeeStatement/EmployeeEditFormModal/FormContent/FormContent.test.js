import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import FormContent from "./FormContent";

let props = {};

jest.mock("src/common", () => ({
  TextInput: "TextInput",
  Button: "Button",
  ErrorText: "ErrorText",
  FormGroup: "FormGroup",
  Datepicker: "Datepicker",
}));

const entity = {
  id: 1,
  name: "Lorem",
  idCompany: 1,
  registry: 1,
  cpf: 1,
  birthDate: "",
  address: {
    neighborhood: "",
    zipcode: "",
    city: "",
    complement: "",
    street: "",
    number: "",
    state: "",
  },
};

beforeEach(() => {
  props = {
    handleSubmit: jest.fn(),
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
    changeInputStatus: jest.fn(),
    touched: {},
    errors: {},
    isValid: true,
    errorMessage: "",
    requestStatus: "",
    closeModal: () => {},
    values: entity,
    setFieldValue: jest.fn(),
    isLoading: false,
    hasError: false,
  };
});

describe("FormContent", () => {
  it("Should render FormContent", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<FormContent {...props} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
