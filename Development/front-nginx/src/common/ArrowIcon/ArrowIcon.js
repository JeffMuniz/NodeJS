import React from "react";
import PropTypes from "prop-types";
import { Arrow } from "./ArrowIcon.styles";

const ArrowIcon = props => {
  const { color, isUp } = props;
  return <Arrow name="arrow-down" color={color} isup={isUp.toString()} />;
};

ArrowIcon.propTypes = {
  color: PropTypes.string,
  isUp: PropTypes.bool,
};

ArrowIcon.defaultProps = {
  color: "",
  isUp: false,
};

export default ArrowIcon;
