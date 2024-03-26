import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import Container from "./Container";

describe("Container", () => {
  it("Should render Container", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(
      <Container>
        <div id="test" />
      </Container>,
    );
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
