import React from "react";
import PropTypes from "prop-types";

const Icon = props => {
  const { name } = props;

  try {
    const Svg = require(`../../assets/svgs/icon-${name}.svg`).default; // eslint-disable-line

    return <Svg {...props} />;
  } catch (e) {
    return null;
  }
};

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Icon;
