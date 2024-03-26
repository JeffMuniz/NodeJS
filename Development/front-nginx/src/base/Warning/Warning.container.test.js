import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import { WarningContainer } from "./Warning.container";

jest.mock("./Warning.js", () => "Warning");

const defaultProps = {
  children: <span>test</span>,
};

describe("WarningContainer", () => {
  it("should render WarningContainer with default props", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<WarningContainer {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
