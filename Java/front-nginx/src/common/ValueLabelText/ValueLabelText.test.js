import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import ValueLabelText from "./ValueLabelText.js";

describe("ValueLabelText", () => {
  it("should render it", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<ValueLabelText />);
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
    renderer.render(<ValueLabelText {...props} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
