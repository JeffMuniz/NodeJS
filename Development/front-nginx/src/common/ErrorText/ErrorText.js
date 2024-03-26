import React from "react";
import { string, node } from "prop-types";

import { StyledText } from "./ErrorText.styles";

const ErrorText = ({ id, children, className }) => (
  <StyledText id={id} className={className}>
    {children}
  </StyledText>
);

export default ErrorText;

ErrorText.propTypes = {
  id: string,
  children: node,
  className: string,
};

ErrorText.defaultProps = {
  id: "error_text",
  children: null,
  className: null,
};
