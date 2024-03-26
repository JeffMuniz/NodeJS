import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import Footer from "./Footer.js";

describe("Footer", () => {
  it("should render it with default props", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(
      <Footer>
        <div id="test">Test</div>
      </Footer>,
    );
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
