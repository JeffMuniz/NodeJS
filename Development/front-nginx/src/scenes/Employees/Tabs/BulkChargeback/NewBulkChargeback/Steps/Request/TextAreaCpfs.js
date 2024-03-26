import React, { PureComponent } from "react";
import { func, string, bool, oneOfType } from "prop-types";

import { TextArea } from "./TextAreaCpfs.styled";

export class TextAreaCpfs extends PureComponent {
  inputParser = e => {
    const { key } = e;
    const keyboard = RegExp(/^[0-9-.\b ]+$/);

    if (key === "Enter") {
      return true;
    }

    if (!keyboard.test(key)) {
      e.preventDefault();
      return false;
    }
  };

  render() {
    const { name, onBlur, hasError, onChange } = this.props;

    return (
      <TextArea
        name={name}
        id="textarea-cpfs"
        placeholder="Ex.:&#10;000.000.000-00&#10;000.000.000-00&#10;000.000.000-00"
        onKeyPress={this.inputParser}
        onBlur={onBlur}
        onChange={onChange}
        hasError={hasError}
      />
    );
  }
}

TextAreaCpfs.propTypes = {
  onChange: func.isRequired,
  name: string.isRequired,
  onBlur: func.isRequired,
  hasError: oneOfType([string, bool]),
};

TextAreaCpfs.defaultProps = {
  hasError: false,
};

export default TextAreaCpfs;
