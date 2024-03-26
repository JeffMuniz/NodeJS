import React from "react";
import PropTypes from "prop-types";
import { Wrapper } from "./Container.styles";

const Container = props => <Wrapper {...props} />;

export default Container;

Container.propTypes = {
  children: PropTypes.node.isRequired,
};
