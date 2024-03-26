import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { buttonTypes } from "@enums";
import TestRenderer from "react-test-renderer";
import Button from "./Button";

jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
}));

let defaultProps = {};
let testRenderer = null;
let instance = null;

beforeEach(() => {
  defaultProps = {
    value: "btn",
    buttonType: buttonTypes.primary,
    disabled: false,
    loading: false,
    onPress: jest.fn(),
    imgSrc: "teste",
    id: "teste",
  };

  testRenderer = TestRenderer.create(<Button {...defaultProps} />);
  instance = testRenderer.root;
});

describe("Button", () => {
  it("Should render Button", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<Button {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("Should return null when call onPress of default props", () => {
    // given
    const props = {
      value: "btn",
      buttonType: buttonTypes.primary,
      disabled: false,
      loading: false,
      id: "teste",
    };

    // when
    testRenderer.update(<Button {...props} />);

    // then
    expect(instance.props.onPress()).tomacull();
  });

  it("Should change value button when loading is true", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<Button {...defaultProps} loading />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
