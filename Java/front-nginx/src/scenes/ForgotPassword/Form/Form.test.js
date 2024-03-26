/* eslint-disable jest/no-disabled-tests */
import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import TestRenderer from "react-test-renderer";
import { TextInput } from "@common";
import ForgotPassword from "./Form";

let props = {};
jest.mock("react-input-mask");
jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
  FormGroup: "FormGroup",
  TextInput: "TextInput",
  Button: "Button",
}));
jest.mock("@base", () => ({
  ContainerWrapper: "ContainerWrapper",
}));

jest.mock("@base", () => ({
  ContainerWrapper: "ContainerWrapper",
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
    returnToLogin: jest.fn(),
    error: "",
  };
});

describe("ForgotPassword - Form", () => {
  it("Should render ForgotPassword", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<ForgotPassword {...props} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("Should render it when error is given", () => {
    // given
    const renderer = new ShallowRenderer();
    const errors = {
      forgotCpf: "Inválida",
      email: "Inválido",
    };
    const touched = {
      forgotCpf: true,
      email: true,
    };

    // when
    renderer.render(
      <ForgotPassword
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
    const testRenderer = TestRenderer.create(<ForgotPassword {...props} />);
    const rootInstance = testRenderer.root;
    // eslint-disable-next-line prefer-destructuring
    const cpfInput = rootInstance.findAllByType(TextInput)[0];

    // when
    cpfInput.props.onClick();

    // then
    expect(rootInstance.props.changeInputStatus).toBeCalledWith(
      "cpfForgotStatus",
    );
  });

  xit("Should call changeInputStatus when email input on click", () => {
    // given
    const testRenderer = TestRenderer.create(<ForgotPassword {...props} />);
    const rootInstance = testRenderer.root;
    // eslint-disable-next-line prefer-destructuring
    const emailInput = rootInstance.findAllByType(TextInput)[1];

    // when
    emailInput.props.onClick();

    // then
    expect(rootInstance.props.changeInputStatus).toBeCalledWith(
      "emailForgotStatus",
    );
  });
});
