import "react-dates/lib/css/_datepicker.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import omit from "lodash/omit";
import { SingleDatePicker } from "react-dates";

import { dateHourFormats } from "@enums";

import DateManager from "src/modules/DateManager/DateManager";

import { Wrapper } from "./SingleDatePicker.styles";

export const TODAY = DateManager().startOf("day");

class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      focused: props.autoFocus,
      date: props.initialDate
        ? DateManager(props.initialDate, dateHourFormats.longDate)
        : TODAY.clone(),
    };
  }

  componentDidUpdate(prevProps, prevState) {
    const { focused, date } = this.state;
    const { onDateChange, onCloseDatePicker } = this.props;

    if (
      !focused &&
      !!prevState.focused &&
      !!date &&
      !!prevState.date &&
      !prevState.date.isSame(date)
    ) {
      onDateChange({ date });
    }

    if (!focused) {
      onCloseDatePicker();
    }
  }

  onDateChange = date => {
    this.setState({ date });
  };

  onFocusChange = ({ focused }) => {
    this.setState({ focused });
  };

  render() {
    const { focused, date } = this.state;

    const props = omit(this.props, [
      "id",
      "autoFocus",
      "initialDate",
      "onCloseDatePicker",
    ]);

    return (
      <Wrapper>
        <SingleDatePicker
          {...props}
          id={props.id}
          onDateChange={this.onDateChange}
          onFocusChange={this.onFocusChange}
          focused={focused}
          date={date}
          enableOutsideDays={false}
          withPortal
          hideKeyboardShortcutsPanel
        />
      </Wrapper>
    );
  }
}

DatePicker.propTypes = {
  id: PropTypes.string.isRequired,
  onDateChange: PropTypes.func,
  onCloseDatePicker: PropTypes.func,
  initialDate: PropTypes.string,
  autoFocus: PropTypes.bool,
  numberOfMonths: PropTypes.number,
};

/* istanbul ignore next */
DatePicker.defaultProps = {
  onDateChange: () => null,
  onCloseDatePicker: () => null,
  initialDate: "",
  autoFocus: false,
  numberOfMonths: 1,
};

export default DatePicker;
