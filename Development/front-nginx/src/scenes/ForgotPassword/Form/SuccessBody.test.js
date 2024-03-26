import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import SuccessBody from "./SuccessBody";

jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
}));
jest.mock("@base", () => ({
  ContainerWrapper: "ContainerWrapper",
}));

const defaultProps = {
  returnToLogin: jest.fn(),
};

describe("SuccessBody", () => {
  it("Should render SuccessBody", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<SuccessBody {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
