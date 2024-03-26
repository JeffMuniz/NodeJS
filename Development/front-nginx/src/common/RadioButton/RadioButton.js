import React from "react";
import PropTypes from "prop-types";

import {
  TextError,
  Description,
  Wrapper,
  Label,
  Box,
  SpanBox,
} from "./RadioButton.styles";

const RadioButton = props => {
  const {
    id,
    selectedValue,
    error,
    onChange,
    labelBefore,
    options,
    name,
    isDisabled,
    setFieldValue,
    setFieldTouched,
    values,
  } = props;

  if (!Array.isArray(options)) return null;

  return (
    <Wrapper>
      {options.map(option => (
        <Label htmlFor={`${id}_${option.id}`} key={option.id}>
          {labelBefore && option.label && (
            <Description labelBefore={labelBefore}>{option.label}</Description>
          )}
          <Box
            id={`${id}_${option.id}`}
            type="radio"
            name={name}
            value={values.option}
            checked={selectedValue === option.value}
            onChange={() => {
              setFieldValue(name, option.value);
              onChange(option.value);
            }}
            disabled={isDisabled}
            onBlur={() => setFieldTouched(name)}
          />
          <SpanBox />
          {!labelBefore && option.label && (
            <Description labelBefore={labelBefore}>{option.label}</Description>
          )}
        </Label>
      ))}
      {error && <TextError id={`${id}_error`}>{error}</TextError>}
    </Wrapper>
  );
};

RadioButton.propTypes = {
  selectedValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
  ]),
  name: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.bool,
      ]),
      id: PropTypes.string,
      label: PropTypes.string,
    }),
  ).isRequired,
  isDisabled: PropTypes.bool,
  labelBefore: PropTypes.bool,
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  setFieldValue: PropTypes.func.isRequired,
  setFieldTouched: PropTypes.func.isRequired,
  values: PropTypes.shape({
    option: PropTypes.string,
  }).isRequired,
};

RadioButton.defaultProps = {
  labelBefore: true,
  selectedValue: "",
  isDisabled: false,
  error: null,
};

export default RadioButton;
