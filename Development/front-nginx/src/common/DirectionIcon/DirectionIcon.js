import React from "react";
import PropTypes from "prop-types";
import { Icon } from "./DirectionIcon.styles";

const DirectionIcon = ({ color, direction }) => (
  <Icon name="chavron" color={color} direction={direction} />
);

DirectionIcon.propTypes = {
  color: PropTypes.string,
  direction: PropTypes.string,
};

DirectionIcon.defaultProps = {
  color: "",
  direction: "",
};

export default DirectionIcon;
