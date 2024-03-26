import React from "react";
import PropTypes from "prop-types";

import { Wrapper, Title, Subtitle } from "./ValueLabelText.styles";

export const ValueLabelText = props => {
  const { title, subtitle, children } = props;
  return (
    <Wrapper {...props}>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      {children}
    </Wrapper>
  );
};

export default ValueLabelText;

ValueLabelText.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
};

ValueLabelText.defaultProps = {
  title: "",
  subtitle: "",
  children: null,
};
