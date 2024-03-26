import React, { Component } from "react";
import { string, func, bool, shape, number, arrayOf } from "prop-types";
import { isObject } from "lodash";

import { dateHourFormats } from "@enums";

import PeriodDropDown from "./PeriodDropDown";

export default class PeriodDropDownContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropDownOpen: false,
      isDatepickerOpen: false,
      selectedStartDate: null,
      selectedEndDate: null,
      selectedValue: props.defaultValue
        ? props.defaultValue
        : props.valueList[0],
    };
  }

  onSelectValue = value => {
    const { selectedValue } = this.state;
    const { onSelectValue } = this.props;

    this.setState({
      selectedValue: value,
      isDropDownOpen: false,
      isDatepickerOpen: false,
    });

    if (selectedValue === value) {
      return;
    }

    onSelectValue(value);
  };

  onClickPeriod = () => {
    this.setState(
      {
        isDatepickerOpen: true,
      },
      this.toggleDropDown(),
    );
  };

  onCloseDatePicker = () => this.setState({ isDatepickerOpen: false });

  onSetCustomPeriod = ({ startDate, endDate }) => {
    const { selectedValue } = this.state;
    const { onSelectValue } = this.props;
    const parsedValue = this.formatDatesToPeriodString(startDate, endDate);

    this.setState({
      isDatepickerOpen: false,
      selectedValue: parsedValue,
      selectedStartDate: startDate.format(dateHourFormats.longDate),
      selectedEndDate: endDate.format(dateHourFormats.longDate),
    });

    if (selectedValue === parsedValue) {
      return;
    }

    onSelectValue({
      startDate: startDate.format(dateHourFormats.longDate),
      endDate: endDate.format(dateHourFormats.longDate),
    });
  };

  formatDatesToPeriodString = (startDate, endDate) => {
    const format = dateHourFormats.abbreviateDateHour;
    const parsed = `${startDate.format(format)} - ${endDate.format(format)}`;
    return parsed;
  };

  toggleDropDown = () => {
    const { blockDropdownOpen } = this.props;
    const { isDropDownOpen } = this.state;

    if (blockDropdownOpen) return;

    this.setState({
      isDropDownOpen: !isDropDownOpen,
    });
  };

  render() {
    const {
      selectedValue,
      isDropDownOpen,
      isDatepickerOpen,
      selectedStartDate,
      selectedEndDate,
    } = this.state;
    const {
      id,
      valueList,
      datePickerMinDate,
      datePickerMaxDate,
      canEditPeriod,
      maxRange,
      calendarInfo,
      padding,
      position,
      editDateText,
    } = this.props;

    const value = isObject(selectedValue)
      ? this.onSetCustomPeriod(selectedValue)
      : selectedValue;

    return (
      <PeriodDropDown
        toggleDropDown={this.toggleDropDown}
        isDropDownOpen={isDropDownOpen}
        selectedValue={value}
        selectedStartDate={selectedStartDate}
        selectedEndDate={selectedEndDate}
        onSelectValue={this.onSelectValue}
        onClickPeriod={this.onClickPeriod}
        onSetCustomPeriod={this.onSetCustomPeriod}
        onCloseDatePicker={this.onCloseDatePicker}
        canEditPeriod={canEditPeriod}
        datepickerOpen={isDatepickerOpen}
        datePickerMinDate={datePickerMinDate}
        datePickerMaxDate={datePickerMaxDate}
        maxRange={maxRange}
        valueList={valueList}
        id={id}
        calendarInfo={calendarInfo}
        padding={padding}
        position={position}
        editDateText={editDateText}
      />
    );
  }
}

PeriodDropDownContainer.propTypes = {
  id: string.isRequired,
  valueList: arrayOf(string),
  onSelectValue: func,
  defaultValue: string,
  canEditPeriod: bool,
  datePickerMinDate: string,
  datePickerMaxDate: string,
  maxRange: shape({
    period: string,
    value: number,
  }),
  calendarInfo: func,
  blockDropdownOpen: bool,
  padding: string,
  position: bool,
  editDateText: string,
};

PeriodDropDownContainer.defaultProps = {
  valueList: ["1", "2", "3"],
  onSelectValue: () => null,
  defaultValue: "",
  canEditPeriod: false,
  datePickerMinDate: "",
  datePickerMaxDate: "",
  maxRange: {},
  calendarInfo: () => null,
  blockDropdownOpen: false,
  padding: "",
  position: true,
  editDateText: "Editar período",
};
