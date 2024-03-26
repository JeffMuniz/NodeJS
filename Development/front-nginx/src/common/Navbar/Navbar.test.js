import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import Navbar from "./Navbar.js";

describe("Navbar", () => {
  it("should render it with default props", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(
      <Navbar>
        <div id="test">Test</div>
      </Navbar>,
    );
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
