import React from "react";
import PropTypes from "prop-types";

import {
  TextError,
  Description,
  Wrapper,
  Box,
  SpanBox,
  StyledLabel,
  CheckIcon,
} from "./CheckBox.styles";

const Checkbox = props => {
  const {
    id,
    checked,
    error,
    label,
    onChange,
    labelBefore,
    isBig,
    disabled,
    name,
    children,
    strongFont,
    borderColor,
  } = props;

  const iconName = isBig ? "check" : "check-small";

  return (
    <Wrapper>
      <StyledLabel htmlFor={id}>
        {labelBefore && (label || children) && (
          <Description strongFont={strongFont}>{label || children}</Description>
        )}
        <Box
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          id={id}
          name={name}
          borderColor={borderColor}
        />
        <SpanBox isBig={isBig} id={`${id}_span`}>
          <CheckIcon name={iconName} />
        </SpanBox>
        {!labelBefore && (label || children) && (
          <Description strongFont={strongFont}>{label || children}</Description>
        )}
      </StyledLabel>
      {error && <TextError id={`${id}_error`}>{error}</TextError>}
    </Wrapper>
  );
};

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  labelBefore: PropTypes.bool,
  isBig: PropTypes.bool,
  error: PropTypes.string,
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node,
  strongFont: PropTypes.bool,
  borderColor: PropTypes.string,
};

Checkbox.defaultProps = {
  isBig: false,
  labelBefore: true,
  checked: false,
  disabled: false,
  error: null,
  label: null,
  children: null,
  strongFont: false,
  borderColor: null,
};

export default Checkbox;
