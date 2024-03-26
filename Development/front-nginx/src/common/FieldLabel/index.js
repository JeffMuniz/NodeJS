import React from "react";
import PropTypes from "prop-types";
import { Label, Value, FieldLabelWrapper } from "./styles";

const FieldLabel = ({ label, value, minWidth, width, children }) => (
  <FieldLabelWrapper minWidth={minWidth} width={width}>
    <Label>{label}</Label>
    <Value>{value || children}</Value>
  </FieldLabelWrapper>
);

FieldLabel.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
  ]).isRequired,
  minWidth: PropTypes.string,
  width: PropTypes.string,
  children: PropTypes.node,
};

FieldLabel.defaultProps = {
  minWidth: "",
  width: "",
  children: null,
};

export default FieldLabel;
