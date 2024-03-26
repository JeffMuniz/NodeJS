import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import DropDown from "./DropDown";

jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
  ClickOutsideListener: "ClickOutsideListener",
}));

describe("DropDown - Component", () => {
  it("should render it dropdown", () => {
    // given
    const renderer = new ShallowRenderer();
    const props = {
      handleClickOutside: jest.fn(),
      triggerRef: { current: jest.fn() },
      handleLogout: jest.fn(),
      deliveryType: "HR",
    };

    // when
    renderer.render(<DropDown {...props} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
