import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import TestRenderer from "react-test-renderer";
import MultiSelect from "./MultiSelect";

let defaultProps = {};
let testRenderer = null;
let instance = null;

beforeEach(() => {
  defaultProps = {
    id: "select",
    items: [
      { name: "test", id: 1 },
      { name: "test2", id: 2 },
    ],
    onChange: jest.fn(),
    onBlur: jest.fn(),
    getMoreData: jest.fn(),
  };

  testRenderer = TestRenderer.create(<MultiSelect {...defaultProps} />);
  instance = testRenderer.root;
});

describe("MultiSelect", () => {
  it("Should render MultiSelect", () => {
    // given
    const renderer = new ShallowRenderer();
    const props = {
      selectedItem: { name: "test", id: 1 },
    };

    // when
    renderer.render(<MultiSelect {...defaultProps} {...props} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("Should render MultiSelect without selectedItem", () => {
    // given
    const renderer = new ShallowRenderer();
    const props = {
      selectedItem: { name: "" },
    };
    // when
    renderer.render(<MultiSelect {...defaultProps} {...props} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("Should return null when call onChange of default props", () => {
    // given
    const props = { id: "test", name: "name" };
    testRenderer.update(<MultiSelect {...props} />);

    // when
    const result = instance.props.onChange();

    // then
    expect(result).tomacull();
  });

  it("Should return null when call onBlur of default props", () => {
    // given
    const props = { id: "test", name: "name" };
    testRenderer.update(<MultiSelect {...props} />);

    // when
    const result = instance.props.onBlur();

    // then
    expect(result).tomacull();
  });

  it("Should return null when call getMoreData of default props", () => {
    // given
    const props = { id: "test", name: "name" };
    testRenderer.update(<MultiSelect {...props} />);

    // when
    const result = instance.props.getMoreData();

    // then
    expect(result).tomacull();
  });
});
