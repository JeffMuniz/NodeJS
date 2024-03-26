import "react-dates/lib/css/_datepicker.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import omit from "lodash/omit";
import { DateRangePicker } from "react-dates";
import { START_DATE } from "react-dates/constants";

import DateManager from "src/modules/DateManager/DateManager";
import { dateHourFormats } from "@enums";

import { Wrapper } from "./PeriodDatePicker.styles";

export const TODAY = DateManager().startOf("day");

class PeriodDatePicker extends Component {
  constructor(props) {
    super(props);
    const { initialStartDate, shouldResetOnClose, initialEndDate } = props;

    this.state = {
      focusedInput: START_DATE,
      startDate:
        initialStartDate && !shouldResetOnClose
          ? DateManager(initialStartDate, dateHourFormats.longDate)
          : null,
      endDate:
        initialEndDate && !shouldResetOnClose
          ? DateManager(initialEndDate, dateHourFormats.longDate)
          : null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { focusedInput, startDate, endDate } = this.state;
    const { onDatesChange, onCloseDatePicker, shouldResetOnClose } = this.props;

    if (
      !focusedInput &&
      !!prevState.focusedInput &&
      !!startDate &&
      !!endDate &&
      (!prevState.startDate ||
        !prevState.startDate.isSame(startDate) ||
        !prevState.endDate ||
        !prevState.endDate.isSame(endDate))
    ) {
      onDatesChange({ startDate, endDate });
    }

    if (!focusedInput) {
      onCloseDatePicker();
    }

    if (!focusedInput && shouldResetOnClose && (!!startDate || !!endDate)) {
      this.resetDates();
    }
  }

  onDatesChange = data => {
    this.setState({ startDate: data.startDate, endDate: data.endDate });
  };

  onFocusChange = focusedInput => {
    this.setState({ focusedInput });
  };

  isOutsideRange = date =>
    this.isOutsideMaxRange(date) || this.isOutsideDateRange(date);

  isOutsideMaxRange = date => {
    const { maxRange } = this.props;
    const { startDate } = this.state;

    if (!maxRange || !startDate) {
      return false;
    }

    const minDate = startDate.clone().subtract(maxRange.value, maxRange.period);
    const maxDate = startDate.clone().add(maxRange.value, maxRange.period);

    if (minDate && date.isBefore(minDate, "day")) {
      return true;
    }

    return maxDate && date.isAfter(maxDate, "day");
  };

  isOutsideDateRange = date => {
    const { minDate, maxDate } = this.props;
    if (!minDate && !maxDate) {
      return false;
    }

    const minDateSet =
      minDate && DateManager(minDate, dateHourFormats.longDate);
    const maxDateSet =
      maxDate && DateManager(maxDate, dateHourFormats.longDate);

    if (minDateSet && date.isBefore(minDateSet, "day")) {
      return true;
    }

    return maxDateSet && date.isAfter(maxDateSet, "day");
  };

  resetDates = () => {
    const { initialStartDate, initialEndDate } = this.props;
    this.setState({
      startDate: initialStartDate
        ? DateManager(initialStartDate, dateHourFormats.longDate)
        : null,
      endDate: initialEndDate
        ? DateManager(initialEndDate, dateHourFormats.longDate)
        : null,
    });
  };

  handleWeekDays = day => {
    day._locale._weekdaysMin = ["D", "2ª", "3ª", "4ª", "5ª", "6ª", "S"]; // eslint-disable-line
    return day.format("D");
  };

  render() {
    const { focusedInput, startDate, endDate } = this.state;

    DateManager.locale("pt-BR");
    const props = omit(this.props, [
      "id",
      "initialStartDate",
      "initialEndDate",
      "minDate",
      "maxDate",
      "onCloseDatePicker",
      "maxRange",
      "shouldResetOnClose",
    ]);

    const { calendarInfo } = this.props;

    return (
      <Wrapper>
        <DateRangePicker
          {...props}
          startDateId={`${props.id}_start_date`}
          endDateId={`${props.id}_end_date`}
          onDatesChange={this.onDatesChange}
          onFocusChange={this.onFocusChange}
          focusedInput={focusedInput}
          startDate={startDate}
          endDate={endDate}
          numberOfMonths={2}
          enableOutsideDays={false}
          isOutsideRange={this.isOutsideRange}
          withPortal
          hideKeyboardShortcutsPanel
          minimumNights={0}
          renderDayContents={this.handleWeekDays}
          firstDayOfWeek={0}
          renderCalendarInfo={calendarInfo}
        />
      </Wrapper>
    );
  }
}

PeriodDatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  onDatesChange: PropTypes.func,
  onCloseDatePicker: PropTypes.func,
  shouldResetOnClose: PropTypes.bool,
  initialStartDate: PropTypes.string,
  initialEndDate: PropTypes.string,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  maxRange: PropTypes.shape({
    period: PropTypes.oneOf(["years", "months", "days"]),
    value: PropTypes.number,
  }),
  calendarInfo: PropTypes.func,
};

/* istanbul ignore next */
PeriodDatePicker.defaultProps = {
  onDatesChange: () => null,
  onCloseDatePicker: () => null,
  shouldResetOnClose: false,
  initialStartDate: "",
  initialEndDate: "",
  minDate: "",
  maxDate: "",
  maxRange: {},
  calendarInfo: () => null,
};

export default PeriodDatePicker;
