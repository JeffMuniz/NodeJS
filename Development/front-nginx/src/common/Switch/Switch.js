import React from "react";
import PropTypes from "prop-types";

import { Label, Wrapper, CheckBox, FakeLabel } from "./Switch.styles";

const Switch = ({
  id,
  labelBefore,
  checked,
  label,
  name,
  onChange,
  ...props
}) => (
  <Wrapper {...props}>
    <CheckBox
      id={id}
      type="checkbox"
      onChange={onChange}
      checked={checked}
      name={name}
    />
    <FakeLabel htmlFor={id} />
    <Label labelBefore={labelBefore}>{label}</Label>
  </Wrapper>
);

Switch.propTypes = {
  id: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  labelBefore: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

Switch.defaultProps = {
  checked: false,
  label: "",
  labelBefore: false,
  placeholder: null,
  onChange: () => null,
};

export default Switch;
