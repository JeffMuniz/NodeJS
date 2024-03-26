/* eslint-disable jest/no-disabled-tests */
import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import TestRenderer from "react-test-renderer";
import TextInput from "@common";
import Form from "./Form";

let props = {};
jest.mock("react-input-mask");
jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
  FormGroup: "FormGroup",
  TextInput: "TextInput",
  Button: "Button",
}));

beforeEach(() => {
  props = {
    handleSubmit: jest.fn(),
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
    changeInputStatus: jest.fn(),
    values: {},
    touched: {},
    errors: {},
    isValid: false,
  };
});

describe("FirstAccess - Form", () => {
  it("Should render form", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<Form {...props} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("Should render it when error is given", () => {
    // given
    const renderer = new ShallowRenderer();
    const errors = {
      password: "Inválida",
      cpf: "Inválido",
    };
    const touched = {
      password: true,
      cpf: true,
    };

    // when
    renderer.render(
      <Form
        {...props}
        touched={touched}
        errors={errors}
        requestError="Error"
      />,
    );
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
  xit("Should call changeInputStatus when cpf input on click", () => {
    // given
    const testRenderer = TestRenderer.create(<Form {...props} />);
    const rootInstance = testRenderer.root;
    // eslint-disable-next-line prefer-destructuring
    const cpfInput = rootInstance.findAllByType(TextInput)[0];

    // when
    cpfInput.props.onClick();

    // then
    expect(rootInstance.props.changeInputStatus).toBeCalledWith("cpfStatus");
  });
  xit("Should call changeInputStatus when password input on click", () => {
    // given
    const testRenderer = TestRenderer.create(<Form {...props} />);
    const rootInstance = testRenderer.root;
    // eslint-disable-next-line prefer-destructuring
    const passwordInput = rootInstance.findAllByType(TextInput)[1];

    // when
    passwordInput.props.onClick();

    // then
    expect(rootInstance.props.changeInputStatus).toBeCalledWith(
      "passwordStatus",
    );
  });
});
