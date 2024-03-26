import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import EmptyVouchers from "./EmptyVouchers";

jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
}));

describe("Order", () => {
  it("Should render Order", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<EmptyVouchers />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
