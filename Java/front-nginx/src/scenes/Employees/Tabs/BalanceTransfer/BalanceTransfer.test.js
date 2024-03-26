import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import BalanceTransfer from "./BalanceTransfer";

jest.mock("@enums", () => ({
  buttonTypes: { primary: "" },
}));

jest.mock("@common", () => ({
  CheckBox: "CheckBox",
  Switch: "Switch",
  Button: "Button",
}));

const defaultProps = {
  hasBalanceTransfer: false,
  hasFoodToMeal: false,
  hasMealToFood: false,
  hasAcceptTerms: false,
  onChangeTransfer: jest.fn(),
  mealValue: "0,00",
  foodValue: "0,00",
  showPopover: jest.fn(),
  visiblePopover: false,
};

describe("Balance Transfer - Scene", () => {
  it("Should render it", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<BalanceTransfer {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
