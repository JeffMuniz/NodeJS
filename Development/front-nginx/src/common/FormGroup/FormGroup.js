import React from "react";
import { string, bool, node } from "prop-types";

import { isEmpty } from "lodash";

import { ErrorText, LabelText, Wrapper, StyledLabel } from "./FormGroup.styles";

export const FormGroup = ({
  error,
  label,
  children,
  fieldId,
  disabled,
  showSuccess,
  responseError,
  className,
}) => {
  const labelNode = label ? (
    <StyledLabel htmlFor={fieldId}>
      <LabelText disabled={disabled}>{label}</LabelText>
      {React.cloneElement(children, {
        showSuccess,
        disabled,
        hasError: !!error || responseError,
      })}
    </StyledLabel>
  ) : (
    children
  );

  const errorNode = (
    <ErrorText id={`${fieldId}_error`} hasError={!isEmpty(error)}>
      {error}
    </ErrorText>
  );

  return (
    <Wrapper className={className}>
      {labelNode}
      {errorNode}
    </Wrapper>
  );
};

export default FormGroup;

FormGroup.propTypes = {
  className: string,
  error: string,
  showSuccess: bool,
  fieldId: string.isRequired,
  label: string,
  disabled: bool,
  children: node.isRequired,
  responseError: bool,
};

FormGroup.defaultProps = {
  className: "",
  error: null,
  label: "",
  disabled: false,
  showSuccess: false,
  responseError: false,
};
