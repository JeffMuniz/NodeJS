import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import EmptyDashboard from "./EmptyDashboard";

const defaultProps = {
  deliveryType: "HR",
  goToNewDeliveryPlace: jest.fn(),
  thereIsActiveDP: false,
};
jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
  Button: "Button",
}));

describe("Order", () => {
  it("Should render empty dashboard", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<EmptyDashboard {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
