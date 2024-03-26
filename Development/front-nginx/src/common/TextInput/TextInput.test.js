import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import TestRenderer from "react-test-renderer";

import TextInput from "./TextInput";

jest.mock("@common", () => ({
  Icon: "Icon",
  TextInputMask: "TextInputMask",
}));

const props = {
  id: "1",
  onChange: jest.fn(),
};

describe("TextInput Component", () => {
  it("should render it", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<TextInput {...props} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("should render text input mask", () => {
    // given
    const renderer = new ShallowRenderer();
    const defaultProps = { ...props, maskType: "cel-phone" };

    // when
    renderer.render(<TextInput {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("should render web input error when the error props is given", () => {
    // given
    const renderer = new ShallowRenderer();
    const defaultProps = {
      ...props,
      hasError: true,
      error: "Campo obrigatório",
    };

    // when
    renderer.render(<TextInput {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("should render web input success", () => {
    // given
    const renderer = new ShallowRenderer();
    const defaultProps = { ...props, showSuccess: true, value: "Teste" };

    // when
    renderer.render(<TextInput {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("Should return null when call onChange of default props", () => {
    // given
    const defaultProps = {
      ...props,
      onChange: jest.fn(() => null),
      onBlur: jest.fn(),
      id: "test",
    };
    const testRenderer = TestRenderer.create(<TextInput {...defaultProps} />);
    const instance = testRenderer.root;

    // when
    const result = instance.props.onChange();

    // then
    expect(result).tomacull();
  });
});
