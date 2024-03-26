import React from "react";
import { string, func } from "prop-types";

import { trackEvent } from "src/modules/Tracking";

import { Touchable } from "./LinkButton.styles";

const LinkButton = ({ onPress, value, action, ...props }) => (
  <Touchable onClick={trackEvent(action, onPress)} {...props}>
    <span>{value}</span>
  </Touchable>
);

LinkButton.propTypes = {
  value: string,
  onPress: func,
  action: string,
};

LinkButton.defaultProps = {
  value: "",
  onPress: () => null,
  action: null,
};

export default LinkButton;
