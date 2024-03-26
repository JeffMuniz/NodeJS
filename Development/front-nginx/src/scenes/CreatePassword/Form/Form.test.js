import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import Form from "./Form";

jest.mock("@common", () => ({
  Button: "Button",
  ErrorText: "ErrorText",
  TextInput: "TextInput",
  CheckBox: "CheckBox",
  RulePassword: "RulePassword",
  FormGroup: "FormGroup",
}));

let props = {};

beforeEach(() => {
  props = {
    handleSubmit: jest.fn(),
    handleChange: jest.fn(),
    handleBlur: jest.fn(),
    values: {},
    touched: {},
    errors: {},
    isValid: false,
    downloadTOSFile: jest.fn(),
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
      confirmPassword: "Inválida",
    };
    const touched = {
      password: true,
      confirmPassword: true,
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
});
