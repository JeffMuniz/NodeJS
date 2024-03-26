import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import TestRenderer from "react-test-renderer";
import Switch from "./Switch";

const props = { id: "test", name: "name" };

describe("Switch", () => {
  it("Should render Switch", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<Switch {...props} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("Should return null when call onChange of default props", () => {
    // given
    const testRenderer = TestRenderer.create(<Switch {...props} />);
    const instance = testRenderer.root;

    // when
    const result = instance.props.onChange();

    // then
    expect(result).tomacull();
  });
});
