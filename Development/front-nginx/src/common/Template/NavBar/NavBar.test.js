import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";

import NavBar from "./NavBar";

jest.mock("./DropDown/DropDown", () => "DropDown");
jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
  Container: "Container",
  Icon: "Icon",
}));

let defaultProps = null;

describe("NavBar", () => {
  beforeEach(() => {
    defaultProps = {
      isAuthenticated: true,
      handleLogout: jest.fn(),
      handleGroupModal: jest.fn(),
      history: {},
      deliveryType: "HR",
      dropDownHasBorder: false,
    };
  });

  it("should render it when is authenticated", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<NavBar {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
