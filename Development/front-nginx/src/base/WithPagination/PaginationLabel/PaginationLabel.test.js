import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import PaginationLabel from "./PaginationLabel";

jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
  DirectionIcon: "DirectionIcon",
}));

describe("PaginationLabel", () => {
  it("Should render PaginationLabel without filtered data", () => {
    // given
    const renderer = new ShallowRenderer();
    const props = {
      onFoward: jest.fn(),
      onBackward: jest.fn(),
      canGoForward: jest.fn(),
      canGoBack: jest.fn(),
      lastItemNumber: 10,
      firstItemNumber: 1,
      totalItems: 100,
    };

    // when
    renderer.render(<PaginationLabel {...props} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
