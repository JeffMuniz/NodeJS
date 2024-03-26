import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import EmptyStatement from "./EmptyStatement";

jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
}));

describe("Order", () => {
  it("Should render Order", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<EmptyStatement />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
