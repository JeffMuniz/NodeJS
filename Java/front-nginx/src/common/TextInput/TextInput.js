import React, { Fragment } from "react";
import { string, func, bool, number } from "prop-types";

import { If } from "@utils";
import { red, inputBorder, green } from "@colors";
import { Icon, TextInputMask } from "@common";

import { Flag, RowView, Eye } from "./TextInput.styles";

const colorBorder = (hasError, showSuccess) => {
  if (hasError) {
    return red;
  }
  return showSuccess ? green : inputBorder;
};

const borderFlag = (hasError, showSuccess) => {
  if (hasError) {
    return "nocheck-input";
  }
  return showSuccess ? "check-input" : "";
};

export const TextInput = ({
  maskType,
  onChange,
  onInput,
  onBlur,
  onClick,
  id,
  hasError,
  showSuccess,
  maskChar,
  value,
  placeholder,
  hasIcon,
  maxLength,
  className,
  disabled,
  eye,
  passwordView,
}) => (
  <Fragment>
    <TextInputMask
      id={id}
      hasIcon={hasIcon}
      maskType={maskType}
      onChange={onChange}
      onInput={onInput}
      onBlur={onBlur}
      onClick={onClick}
      maskChar={maskChar}
      value={value}
      placeholder={placeholder}
      colorBorder={colorBorder(hasError, showSuccess)}
      maxLength={maxLength}
      className={className}
      disabled={disabled}
    />
    <RowView>
      <If test={hasError || showSuccess}>
        <Flag>
          <Icon name={borderFlag(hasError, showSuccess)} />
        </Flag>
      </If>
      <If test={eye}>
        <Eye>
          <Icon
            onClick={passwordView}
            name={maskType === "text" ? "eye-off" : "eye"}
          />
        </Eye>
      </If>
    </RowView>
  </Fragment>
);

export default TextInput;

TextInput.propTypes = {
  id: string.isRequired,
  placeholder: string,
  maskType: string,
  onChange: func.isRequired,
  onInput: func,
  onBlur: func,
  onClick: func,
  maskChar: string,
  value: string,
  hasError: bool,
  showSuccess: bool,
  hasIcon: bool,
  disabled: bool,
  maxLength: number,
  className: string,
  eye: bool,
  passwordView: func,
};

TextInput.defaultProps = {
  placeholder: null,
  maskType: "",
  onClick: () => null,
  onBlur: () => null,
  onInput: () => null,
  maskChar: "",
  value: "",
  hasError: false,
  showSuccess: false,
  hasIcon: false,
  maxLength: null,
  className: "",
  disabled: false,
  eye: false,
  passwordView: () => null,
};
