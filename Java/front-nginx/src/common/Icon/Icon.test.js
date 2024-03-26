import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import Icon from "./Icon";

describe("Icon - Component", () => {
  it("Should render child", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<Icon name="mac" />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("should not render icon", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<Icon name="" />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
