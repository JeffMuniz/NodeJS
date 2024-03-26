import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import TestRenderer from "react-test-renderer";

import { TextError, Box } from "./RadioButton.styles";
import RadioButton from "./RadioButton.js";

let defaultProps = {};
let testRenderer = null;
let instance = null;

const radioValues = [
  { value: true, label: "Sim", id: "Y" },
  { value: false, label: "Não", id: "N" },
];

beforeEach(() => {
  defaultProps = {
    options: radioValues,
    name: "radio",
    id: "radioId",
    onChange: jest.fn(),
    selectedValue: "",
    setFieldValue: jest.fn(),
    setFieldTouched: jest.fn(),
    values: { option: "" },
    labelBefore: true,
    isDisabled: false,
    error: null,
  };

  testRenderer = TestRenderer.create(<RadioButton {...defaultProps} />);
  instance = testRenderer.root;
});

describe("RadioButton", () => {
  it("should render it with default props", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<RadioButton {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("should render it when labelBefore is false", () => {
    // given
    const renderer = new ShallowRenderer();
    const labelBefore = false;

    // when
    renderer.render(
      <RadioButton {...defaultProps} labelBefore={labelBefore} />,
    );
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("should render Error when error is given", () => {
    // given
    const error = "error test";

    // when
    testRenderer.update(<RadioButton {...defaultProps} error={error} />);

    const errors = instance.findAllByType(TextError);

    // then
    expect(errors).toHaveLength(1);
  });

  it("should call onChange when button props change", () => {
    // given
    let calls = false;

    // when
    testRenderer.update(<RadioButton {...defaultProps} />);
    const boxes = instance.findAllByType(Box);

    boxes.map(box => {
      box.props.onChange("teste");

      // then
      expect(defaultProps.onChange).toBeCalled();
      calls = true;
      return null;
    });

    // then
    expect(calls).toBeTruthy();
  });

  it("should not rendering Radio Button when not pass options", () => {
    // when
    testRenderer.update(<RadioButton {...defaultProps} options={[]} />);

    const boxes = instance.findAllByType(Box);

    expect(boxes).toHaveLength(0);
  });
});
