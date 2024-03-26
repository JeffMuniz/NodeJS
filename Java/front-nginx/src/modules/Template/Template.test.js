import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import Template from "./Template.js";

describe("Template", () => {
  it("should render it with default props", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(
      <Template>
        <div id="test">Test</div>
      </Template>,
    );
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
