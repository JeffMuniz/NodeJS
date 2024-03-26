import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import CheckBox from "./CheckBox";

let defaultProps = {};

beforeEach(() => {
  defaultProps = {
    id: "test",
    name: "test",
    onChange: jest.fn(),
  };
});

describe("CheckBox", () => {
  it("Should render CheckBox", () => {
    // given
    const renderer = new ShallowRenderer();
    const props = {
      labelBefore: true,
      label: "test",
    };

    // when
    renderer.render(<CheckBox {...defaultProps} {...props} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("Should render CheckBox without labelBefore", () => {
    // given
    const renderer = new ShallowRenderer();
    const props = {
      labelBefore: false,
      label: "test",
    };

    // when
    renderer.render(<CheckBox {...defaultProps} {...props} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("Should render errors in CheckBox", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<CheckBox {...defaultProps} error="error test" />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("Should render CheckBox with big icon", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<CheckBox {...defaultProps} isBig />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
