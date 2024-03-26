import React from "react";
import ShallowRenderer from "react-test-renderer/shallow";
import ReportDatePicker from "./ReportDatePicker";

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

describe("ReportDatePicker Container Component", () => {
  it("should render it", () => {
    // given
    const renderer = new ShallowRenderer();

    // when
    renderer.render(<ReportDatePicker {...defaultProps} />);
    const result = renderer.getRenderOutput();

    // then
    expect(result).toMatchSnapshot();
  });
});
