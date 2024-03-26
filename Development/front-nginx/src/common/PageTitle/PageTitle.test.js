import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import PageTitle from "./PageTitle.js";

describe("PageTitle", () => {
  it("should render it", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<PageTitle />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("should render it with props", () => {
    // given
    const props = {
      title: "Título Teste",
      subtitle: "Subtítulo Teste",
    };
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<PageTitle {...props} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
