import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import PeriodDropDown from "./PeriodDropDown";

jest.mock(
  "src/common/PeriodDatePicker/PeriodDatePicker",
  () => "PeriodDatePicker",
);
jest.mock("@common", () => ({
  SvgIcon: "SvgIcon",
  ArrowIcon: "ArrowIcon",
  PeriodDatePicker: "PeriodDatePicker",
  ClickOutsideListener: "PeriodDatePicker",
}));

const defaultProps = {
  id: "TestDropDown",
  canEditPeriod: true,
  datepickerOpen: true,
  valueList: ["1", "2", "3"],
};

describe("PeriodDropDown Container Component", () => {
  it("should render it", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<PeriodDropDown {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
