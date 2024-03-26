import React from "react";
import { string, node } from "prop-types";
import { If } from "@utils";
import { SvgIcon } from "@common";
import { Container, Text, Divider } from "./EmptyState.styles";

const EmptyState = ({ text, children }) => (
  <Container id="empty_state">
    <SvgIcon name="emptyGrid" />
    <Text id="empty_state_message">{text}</Text>
    <Divider />
    <If test={children}>{children}</If>
  </Container>
);

EmptyState.propTypes = {
  text: string.isRequired,
  children: node,
};

EmptyState.defaultProps = {
  children: null,
};

export default EmptyState;
