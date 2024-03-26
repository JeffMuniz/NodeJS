import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import Overlay from "./Overlay";

const defaultProps = {
  children: <div>test</div>,
  handleClick: jest.fn(),
};

describe("Voucher Section - Unit Test", () => {
  it("Should render Voucher Section type food", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<Overlay {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
