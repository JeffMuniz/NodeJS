import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import PageNotFound from "./PageNotFound";

jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
}));
jest.mock("@base", () => ({
  ContainerWrapper: "ContainerWrapper",
}));

const defaultProps = {
  handleReturn: jest.fn(),
};

describe("PageNotFound", () => {
  it("Should render PageNotFound", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<PageNotFound {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
