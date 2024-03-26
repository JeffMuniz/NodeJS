import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import Alert from "./Alert";

jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
}));

describe("Alert", () => {
  it("Should render Alert", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<Alert />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });

  it("Should render Alert with prop type", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<Alert type="error" />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
