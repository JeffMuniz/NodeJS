import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import DefaultEmptyState from "./DefaultEmptyState";

jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
}));

describe("DefaultEmptyState", () => {
  it("Should render DefaultEmptyState", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<DefaultEmptyState />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
