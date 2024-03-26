import "react-dates/lib/css/_datepicker.css";
import React, { PureComponent } from "react";
import { string, func, bool, shape, oneOf, number } from "prop-types";
import { omit } from "lodash";
import { DateRangePicker } from "react-dates";
import { START_DATE, END_DATE } from "react-dates/constants";

import DateManager from "src/modules/DateManager/DateManager";
import { dateHourFormats } from "@enums";

import { Wrapper } from "./ReportDatePicker.styles";

class ReportDatePicker extends PureComponent {
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

  componentDidUpdate() {
    const { focusedInput, startDate, endDate } = this.state;
    const { onCloseDatePicker, shouldResetOnClose } = this.props;

    if (!focusedInput) {
      onCloseDatePicker();
    }

    if (!focusedInput && shouldResetOnClose && (!!startDate || !!endDate)) {
      this.resetDates();
    }
  }

  onDatesChange = ({ startDate, endDate }) => {
    const { onDatesChange } = this.props;
    const focusedInput =
      // eslint-disable-next-line react/destructuring-assignment
      !!endDate && this.state.focusedInput === END_DATE ? START_DATE : END_DATE;

    this.setState(
      {
        startDate,
        endDate,
        focusedInput,
      },
      () => onDatesChange({ startDate, endDate }),
    );
  };

  onFocusChange = focusedInput => {
    if (!focusedInput) return;
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
      "calendarInfo",
    ]);

    const { calendarInfo, onClose } = this.props;

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
          hideKeyboardShortcutsPanel
          minimumNights={0}
          firstDayOfWeek={0}
          renderCalendarInfo={calendarInfo}
          onClose={onClose}
        />
      </Wrapper>
    );
  }
}

ReportDatePicker.propTypes = {
  id: string.isRequired,
  onDatesChange: func,
  onClose: func,
  onCloseDatePicker: func,
  shouldResetOnClose: bool,
  initialStartDate: string,
  initialEndDate: string,
  minDate: shape({}),
  maxDate: shape({}),
  maxRange: shape({
    period: oneOf(["years", "months", "days"]),
    value: number,
  }),
  calendarInfo: func,
};

/* istanbul ignore next */
ReportDatePicker.defaultProps = {
  onDatesChange: () => null,
  onCloseDatePicker: () => null,
  shouldResetOnClose: false,
  initialStartDate: "",
  initialEndDate: "",
  minDate: {},
  maxDate: {},
  maxRange: {},
  calendarInfo: () => null,
  onClose: () => null,
};

export default ReportDatePicker;
