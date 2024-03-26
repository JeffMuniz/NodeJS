import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import Loading from "./Loading";

describe("Loading", () => {
  it("Should render Loading", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<Loading />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
