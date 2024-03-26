import React from "react";
import TestRenderer from "react-test-renderer";
import * as reactDatesConstants from "react-dates/constants";
import DateManager from "src/modules/DateManager/DateManager";
import { dateHourFormats } from "@enums";
import PeriodDatePicker from "./PeriodDatePicker";

jest.mock("react-dates");
reactDatesConstants.START_DATE = "start date";

let testRenderer = null;
let instance = null;

beforeEach(() => {
  const defaultProps = {
    id: "TestDatePicker",
    onDatesChange: jest.fn(),
    onCloseDatePicker: jest.fn(),
  };
  testRenderer = TestRenderer.create(<PeriodDatePicker {...defaultProps} />);
  instance = testRenderer.getInstance();
});

describe("PeriodDatePicker Component", () => {
  it("should call onDatesChange prop function when dates are selected and no input is focused", () => {
    // given
    const selectedValues = {
      startDate: DateManager("10-02-2018", dateHourFormats.longDate),
      endDate: DateManager("11-02-2018", dateHourFormats.longDate),
    };

    // when
    instance.setState({
      ...selectedValues,
      focusedInput: undefined,
    });

    // then
    expect(instance.props.onDatesChange).toBeCalledWith(selectedValues);
  });

  it("should not call onDatesChange prop function when dates are selected and input is focused", () => {
    // given
    const selectedValues = {
      startDate: DateManager("10-02-2018", dateHourFormats.longDate),
      endDate: DateManager("12-02-2018", dateHourFormats.longDate),
    };

    // when
    instance.setState({
      ...selectedValues,
      focusedInput: "end date",
    });

    // then
    expect(instance.props.onDatesChange).not.toBeCalled();
  });

  it("should not call onDatesChange prop function when any new selected date is null or undefined", () => {
    // given
    const selectedValues = {
      startDate: DateManager("10-02-2018", dateHourFormats.longDate),
      endDate: null,
    };

    // when
    instance.setState({
      ...selectedValues,
      focusedInput: undefined,
    });

    // then
    expect(instance.props.onDatesChange).not.toBeCalled();
  });

  it("should set start and end date state when onDatesChange is called", () => {
    // given
    const selectedValues = {
      startDate: DateManager("10-02-2018", dateHourFormats.longDate),
      endDate: DateManager("11-02-2018", dateHourFormats.longDate),
    };

    // when
    instance.onDatesChange(selectedValues);

    // then
    expect(instance.state.startDate).toEqual(selectedValues.startDate);
    expect(instance.state.endDate).toEqual(selectedValues.endDate);
  });

  it("should set start and end date state when onFocusChange is called", () => {
    // given
    const newFocus = "end date";

    // when
    instance.onFocusChange(newFocus);

    // then
    expect(instance.state.focusedInput).toEqual(newFocus);
  });

  it("isOutsideRange should return false when minDate and maxDate props are not passed", () => {
    // given
    const testValue = "end date";

    // when
    const result = instance.isOutsideRange(testValue);

    // then
    expect(result).not.toBeTruthy();
  });

  it("isOutsideRange should return false when minDate prop is passed and selectedDate is after minDate", () => {
    // given
    const defaultProps = {
      id: "TestDatePicker",
      onDatesChange: jest.fn(),
      onCloseDatePicker: jest.fn(),
    };
    const minDate = "09-02-2018";
    const testValue = DateManager("10-02-2018", dateHourFormats.longDate);
    testRenderer.update(
      <PeriodDatePicker {...defaultProps} minDate={minDate} />,
    );

    // when
    const result = instance.isOutsideRange(testValue);

    // then
    expect(result).not.toBeTruthy();
  });

  it("isOutsideRange should return true when minDate prop is passed and selectedDate is before minDate", () => {
    // given
    const defaultProps = {
      id: "TestDatePicker",
      onDatesChange: jest.fn(),
      onCloseDatePicker: jest.fn(),
    };
    const minDate = "09-02-2018";
    const testValue = DateManager("08-02-2018", dateHourFormats.longDate);
    testRenderer.update(
      <PeriodDatePicker {...defaultProps} minDate={minDate} />,
    );

    // when
    const result = instance.isOutsideRange(testValue);

    // then
    expect(result).toBeTruthy();
  });

  it("isOutsideRange should return true when maxDate prop is passed and selectedDate is after maxDate", () => {
    // given
    const defaultProps = {
      id: "TestDatePicker",
      onDatesChange: jest.fn(),
      onCloseDatePicker: jest.fn(),
    };
    const maxDate = "09-02-2018";
    const testValue = DateManager("10-02-2018", dateHourFormats.longDate);
    testRenderer.update(
      <PeriodDatePicker {...defaultProps} maxDate={maxDate} />,
    );

    // when
    const result = instance.isOutsideRange(testValue);

    // then
    expect(result).toBeTruthy();
  });

  it("isOutsideRange should return false when maxDate prop is passed and selectedDate is before maxDate", () => {
    // given
    const defaultProps = {
      id: "TestDatePicker",
      onDatesChange: jest.fn(),
      onCloseDatePicker: jest.fn(),
    };
    const maxDate = "09-02-2018";
    const testValue = DateManager("08-02-2018", dateHourFormats.longDate);
    testRenderer.update(
      <PeriodDatePicker {...defaultProps} maxDate={maxDate} />,
    );

    // when
    const result = instance.isOutsideRange(testValue);

    // then
    expect(result).not.toBeTruthy();
  });
});
