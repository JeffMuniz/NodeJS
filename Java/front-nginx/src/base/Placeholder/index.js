import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { SvgIcon } from "@common";
import { inputPlaceholder } from "@colors";
import { Container, SubTitle, Divider } from "./styles";

const Placeholder = ({
  iconName,
  iconSize,
  message,
  hasError,
  paddingLess,
  paddingTop,
  children,
}) => (
  <Fragment>
    {hasError ? (
      <Container paddingTop={paddingLess ? null : paddingTop}>
        <SvgIcon name={iconName} fill={inputPlaceholder} size={iconSize} />
        <SubTitle>{message}</SubTitle>
        <Divider />
      </Container>
    ) : (
      children
    )}
  </Fragment>
);

Placeholder.propTypes = {
  iconName: PropTypes.string,
  iconSize: PropTypes.string,
  message: PropTypes.string,
  hasError: PropTypes.bool.isRequired,
  paddingTop: PropTypes.string,
  children: PropTypes.node.isRequired,
  paddingLess: PropTypes.bool,
};

Placeholder.defaultProps = {
  iconName: "warning",
  iconSize: "200",
  message: "",
  paddingTop: "100px",
  paddingLess: false,
};

export default Placeholder;
