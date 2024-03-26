import React from "react";
import { string, func } from "prop-types";
import { WebInput } from "./DateInput.styles";

const DateInput = ({ id, name, value, onChange, onClick }) => (
  <WebInput
    onClick={onClick}
    id={id}
    name={name}
    value={value}
    onChange={onChange}
    type="date"
  />
);

DateInput.propTypes = {
  id: string,
  name: string,
  value: string,
  onChange: func,
  onClick: func,
};

DateInput.defaultProps = {
  value: "",
  onChange: () => null,
  id: "",
  name: "",
  onClick: () => null,
};

export default DateInput;
