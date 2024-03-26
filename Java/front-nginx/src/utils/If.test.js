import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import If from "./If";

describe("If - Util", () => {
  it("Should render child", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(
      <If test>
        <div id="test">Test</div>
      </If>,
    );
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("should not render child", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(
      <If test={false}>
        <div id="test">Test</div>
      </If>,
    );
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
