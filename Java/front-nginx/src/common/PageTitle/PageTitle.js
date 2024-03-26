import React from "react";
import PropTypes from "prop-types";

import { Wrapper, Title, Subtitle } from "./PageTitle.styles";

const PageTitle = props => {
  const { title, subtitle, children } = props;
  return (
    <Wrapper {...props}>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
      {children}
    </Wrapper>
  );
};

export default PageTitle;

PageTitle.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  children: PropTypes.node,
};

PageTitle.defaultProps = {
  title: "",
  subtitle: "",
  children: null,
};
