import React from "react";
import TestRenderer from "react-test-renderer";
import DateManager from "src/modules/DateManager/DateManager";

import { dateHourFormats } from "@enums";

import PeriodDropDownContainer from "./PeriodDropDown.container";

jest.mock("./PeriodDropDown", () => "PeriodDropDown");

let testRenderer = null;
let instance = null;

beforeEach(() => {
  const props = {
    id: "TestDropDown",
    onSelectValue: jest.fn(),
  };

  testRenderer = TestRenderer.create(<PeriodDropDownContainer {...props} />);
  instance = testRenderer.getInstance();
});

describe("PeriodDropDown Container Component", () => {
  it("should set selectedValue state and set dropDown and Datepicker to closed when onSelectValue is called", () => {
    // given
    const valueToSelect = "1";

    // when
    instance.onSelectValue(valueToSelect);

    // then
    expect(instance.state.selectedValue).toEqual(valueToSelect);
    expect(instance.state.isDropDownOpen).not.toBeTruthy();
    expect(instance.state.isDatepickerOpen).not.toBeTruthy();
  });

  it("should not call onSelectValue prop function when onSelectValue is called with value equal to current selected value", () => {
    // given
    const valueToSelect = "1";
    instance.state.selectedValue = valueToSelect;

    // when
    instance.onSelectValue(valueToSelect);

    // then
    expect(instance.props.onSelectValue).not.toBeCalled();
  });

  it("should call onSelectValue prop function when onSelectValue is called with selected value different from current selected value", () => {
    // given
    const valueToSelect = "1";
    const initialValue = "2";
    instance.state.selectedValue = initialValue;

    // when
    instance.onSelectValue(valueToSelect);

    // then
    expect(instance.props.onSelectValue).toBeCalled();
  });

  it("should open Datepicker and toggle dropDown when onClickPeriod is called", () => {
    // given
    instance.state.isDatepickerOpen = false;
    instance.toggleDropDown = jest.fn();

    // when
    instance.onClickPeriod();

    // then
    expect(instance.toggleDropDown).toBeCalled();
    expect(instance.state.isDatepickerOpen).toBeTruthy();
  });

  it("should close Datepicker when onCloseDatePicker is called", () => {
    // given
    instance.state.isDatepickerOpen = true;

    // when
    instance.onCloseDatePicker();

    // then
    expect(instance.state.isDatepickerOpen).not.toBeTruthy();
  });

  it("should open dropDown when toggleDropDown is called with dropDown closed", () => {
    // given
    instance.state.isDropDownOpen = false;

    // when
    instance.toggleDropDown();

    // then
    expect(instance.state.isDropDownOpen).toBeTruthy();
  });

  it("should close dropDown when toggleDropDown is called with dropDown open", () => {
    // given
    instance.state.isDropDownOpen = true;

    // when
    instance.toggleDropDown();

    // then
    expect(instance.state.isDropDownOpen).not.toBeTruthy();
  });

  it("should return formatted date when formatDatesToPeriodString is called", () => {
    // given
    const params = {
      startDate: DateManager("10-01-2018", dateHourFormats.longDate),
      endDate: DateManager("20-01-2018", dateHourFormats.longDate),
    };

    const expectedResult = "10 Jan 18 - 20 Jan 18";

    // when
    const result = instance.formatDatesToPeriodString(
      params.startDate,
      params.endDate,
    );

    // then
    expect(result).toEqual(expectedResult);
  });

  it("should close Datepicker when onSetCustomPeriod is called", () => {
    // given
    const params = {
      startDate: DateManager("10-01-2018", dateHourFormats.longDate),
      endDate: DateManager("20-01-2018", dateHourFormats.longDate),
    };

    instance.formatDatesToPeriodString = jest.fn();
    instance.state.isDatepickerOpen = true;

    // when
    instance.onSetCustomPeriod(params);

    // then
    expect(instance.state.isDatepickerOpen).not.toBeTruthy();
  });

  it("should set selected dates when onSetCustomPeriod is called", () => {
    // given
    const params = {
      startDate: DateManager("10-01-2018", dateHourFormats.longDate),
      endDate: DateManager("20-01-2018", dateHourFormats.longDate),
    };

    instance.formatDatesToPeriodString = jest.fn(() => "test");
    instance.state.selectedValue = "11 Jan 18 - 12 Jan 18";

    // when
    instance.onSetCustomPeriod(params);

    // then
    expect(instance.state.selectedStartDate).toEqual(
      params.startDate.format(dateHourFormats.longDate),
    );
    expect(instance.state.selectedEndDate).toEqual(
      params.endDate.format(dateHourFormats.longDate),
    );
    expect(instance.state.selectedValue).toEqual("test");
  });

  it("should call onSelectValue prop function when onSetCustomPeriod is called with value different from selectedValue", () => {
    // given
    const params = {
      startDate: DateManager("10-01-2018", dateHourFormats.longDate),
      endDate: DateManager("20-01-2018", dateHourFormats.longDate),
    };

    instance.state.selectedValue = "11 Jan 18 - 12 Jan 18";

    // when
    instance.onSetCustomPeriod(params);

    // then
    expect(instance.props.onSelectValue).toBeCalled();
  });

  it("should not call onSelectValue prop function when onSetCustomPeriod is called with value equal to selectedValue", () => {
    // given
    const params = {
      startDate: DateManager("10-01-2018", dateHourFormats.longDate),
      endDate: DateManager("20-01-2018", dateHourFormats.longDate),
    };

    instance.state.selectedValue = "10 Jan 18 - 20 Jan 18";

    // when
    instance.onSetCustomPeriod(params);

    // then
    expect(instance.props.onSelectValue).not.toBeCalled();
  });
});
