import React from "react";
import { bool, oneOfType, number, string } from "prop-types";

import { Line } from "./Separator.styles";

export const Separator = ({ disabled, width, rotate }) => (
  <Line disabled={disabled} width={width} rotate={rotate} />
);

Separator.propTypes = {
  disabled: bool,
  width: oneOfType([string, number]),
  rotate: bool,
};

Separator.defaultProps = {
  disabled: false,
  width: "100%",
  rotate: false,
};

export default Separator;
