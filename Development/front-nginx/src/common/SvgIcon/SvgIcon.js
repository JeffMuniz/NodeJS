import React from "react";
import PropTypes from "prop-types";
import * as Icons from "@assets";

const capitalize = (string = "") =>
  string.charAt(0).toUpperCase() + string.slice(1);

const SvgIcon = ({ name, icon, ...rest }) => {
  const iconName = `Icon${capitalize(name)}`;
  const Svg = icon || Icons[iconName];

  return Svg ? <Svg {...rest} /> : null;
};

SvgIcon.propTypes = {
  name: PropTypes.string,
  icon: PropTypes.func,
};

SvgIcon.defaultProps = {
  name: "",
  icon: null,
};

export default SvgIcon;
