import React from "react";
import PropTypes from "prop-types";

import {
  Wrapper,
  Title,
  Subtitle,
  ProductPhoto,
  Content,
  Action,
} from "./Banner.styles";

const Banner = props => {
  const {
    backgroundColor,
    logoSource,
    logoAlt,
    title,
    description,
    action,
  } = props;
  return (
    <Wrapper {...props}>
      <ProductPhoto
        backgroundColor={backgroundColor}
        image={logoSource}
        alt={logoAlt}
      />
      <Content>
        <Title>{title}</Title>
        <Subtitle>{description}</Subtitle>
      </Content>
      <Action>{action}</Action>
    </Wrapper>
  );
};

export default Banner;

Banner.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  logoSource: PropTypes.string.isRequired,
  logoAlt: PropTypes.string,
  backgroundColor: PropTypes.string,
  action: PropTypes.node,
};

Banner.defaultProps = {
  title: "",
  description: "",
  backgroundColor: "#fff",
  logoAlt: "Logo",
  action: null,
};
