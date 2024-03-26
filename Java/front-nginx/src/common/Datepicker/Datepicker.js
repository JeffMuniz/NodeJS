import React from "react";
import PropTypes from "prop-types";
import DateManager from "moment";

import { dateHourFormats } from "@enums";

import { WebInput, Wrapper } from "./Datepicker.styles";

export default function Datepicker({
  error,
  maxDate,
  minDate,
  id,
  value,
  ...props
}) {
  const dateValue = value
    ? DateManager(value, dateHourFormats.longDateUS).format(
        dateHourFormats.longDateUS,
      )
    : "";
  return (
    <Wrapper>
      <WebInput
        {...props}
        type="date"
        id={id}
        min={minDate}
        max={maxDate}
        value={dateValue}
      />
    </Wrapper>
  );
}

Datepicker.propTypes = {
  id: PropTypes.string.isRequired,
  error: PropTypes.string,
  value: PropTypes.string,
  maxDate: PropTypes.string,
  minDate: PropTypes.string,
};

Datepicker.defaultProps = {
  error: null,
  value: "",
  maxDate: null,
  minDate: null,
};
