import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import Banner from "./Banner";

describe("Banner", () => {
  it("Should render Banner", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<Banner logoSource="" />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
