import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import RulePassword from "./RulePassword";

const props = {
  text: "Teste",
  value: "Aser",
  rule: "/^(?=.*?[A-Z])/",
};

jest.mock("@common", () => ({
  Icon: "Icon",
}));

describe("Rule Password", () => {
  it("Render Rule Password", () => {
    const renderer = new ShallowRenderer();
    const defaultProps = {
      ...props,
      error: false,
    };

    // when
    renderer.render(<RulePassword {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("Render error", () => {
    const defaultProps = {
      ...props,
      error: true,
    };
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<RulePassword {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
