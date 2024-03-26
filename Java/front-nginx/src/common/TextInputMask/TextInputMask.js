import React, { Component } from "react";
import { string, func, bool, number } from "prop-types";
import { masks } from "@enums";
import { toOnlyNumbers } from "@utils";
import { TextInputWithMask, WebInput } from "./TextInputMask.styles";

const CELL_PHONE_MASK_TYPE = "cel-phone";

export default class TextInputMask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || "",
      mask: masks[props.maskType],
    };
  }

  static getDerivedStateFromProps(nextProps) {
    let newState = {
      value: nextProps.value,
      mask: masks[nextProps.maskType],
    };

    if (nextProps.maskType === CELL_PHONE_MASK_TYPE) {
      const text = toOnlyNumbers(nextProps.value);
      newState = {
        value: text,
        mask: text.length <= 10 ? masks[nextProps.maskType] : masks.phone_9,
      };
    }
    return { ...newState };
  }

  render() {
    const {
      maskType,
      id,
      onChange,
      onInput,
      onBlur,
      colorBorder,
      placeholder,
      maskChar,
      hasIcon,
      maxLength,
      className,
      onClick,
      disabled,
    } = this.props;
    const { value, mask } = this.state;
    const defaultProps = {
      placeholder,
      id,
      value,
      onClick,
      onChange,
      onInput,
      onBlur,
      className,
      maxLength,
      colorBorder,
      disabled,
      hasIcon,
      mask,
    };

    return typeof maskType === "undefined" ? (
      <WebInput {...defaultProps} autocomplete="off" />
    ) : (
      <TextInputWithMask
        {...defaultProps}
        mask={mask}
        maskChar={maskChar}
        type={maskType}
        autocomplete="off"
      />
    );
  }
}

TextInputMask.propTypes = {
  id: string.isRequired,
  maskType: string,
  colorBorder: string,
  onChange: func.isRequired,
  onInput: func,
  onBlur: func.isRequired,
  placeholder: string,
  maskChar: string,
  mask: string,
  hasIcon: bool,
  value: string,
  maxLength: number,
  className: string,
  onClick: func,
  disabled: bool,
};

TextInputMask.defaultProps = {
  maskType: undefined,
  colorBorder: "",
  placeholder: "",
  maskChar: "",
  mask: "",
  value: "",
  hasIcon: false,
  maxLength: null,
  className: "",
  onClick: () => null,
  onInput: () => null,
  disabled: false,
};
