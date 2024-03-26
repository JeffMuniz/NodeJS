import React from "react";
import { func, string, number } from "prop-types";
import { SvgIcon } from "@common";

import { Button, IconWrapper } from "./ClickabeIcon.styles";

const ClickabeIcon = ({ id, handleClick, src, width, padding, margin }) => (
  <Button id={id} onClick={handleClick} padding={padding} margin={margin}>
    <IconWrapper size={width}>
      <SvgIcon name={src} size={width} />
    </IconWrapper>
  </Button>
);

ClickabeIcon.propTypes = {
  id: string.isRequired,
  handleClick: func,
  src: string,
  width: number,
  padding: string,
  margin: string,
};

ClickabeIcon.defaultProps = {
  handleClick: () => undefined,
  src: "",
  width: 24,
  padding: "0",
  margin: "0",
};

export default ClickabeIcon;
