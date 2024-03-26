import React from "react";
import { node, string } from "prop-types";

import { Container, Message } from "./Tooltip.styles";

const Tooltip = ({ message, children }) => (
  <Container id="wrapper-tooltip">
    {children} <Message id="message-tooltip">{message}</Message>
  </Container>
);

Tooltip.propTypes = {
  message: string.isRequired,
  children: node.isRequired,
};

export default Tooltip;
