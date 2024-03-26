import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import ErrorsList from "./ErrorsList";

describe("ErrorsList", () => {
  it("Should render ErrorsList", () => {
    // given
    const renderer = new ShallowRenderer();
    const props = {
      data: [],
    };
    // when
    renderer.render(<ErrorsList {...props} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
