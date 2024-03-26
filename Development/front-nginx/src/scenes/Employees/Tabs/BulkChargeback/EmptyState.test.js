import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import EmptyState from "./EmptyState";

const defaultProps = {
  onClickCreateReport: jest.fn(),
  chargebacks: jest.fn(),
};

jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
  Button: "Button",
}));

jest.mock("@base", () => ({
  Loading: "Loading",
}));

describe("Reports - Table - EmptyState", () => {
  it("should render EmptyState", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<EmptyState {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
