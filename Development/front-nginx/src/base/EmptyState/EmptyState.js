import React from "react";
import { node } from "prop-types";

import { SvgIcon } from "@common";
import { Container, Text } from "./EmptyState.styles";

const EmptyState = ({ children }) => (
  <Container>
    <SvgIcon name="emptyGrid" />
    <Text>{children}</Text>
  </Container>
);

EmptyState.propTypes = {
  children: node.isRequired,
};

export default EmptyState;
