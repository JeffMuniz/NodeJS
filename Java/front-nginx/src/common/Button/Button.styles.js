import styled from "styled-components";
import { switchStyle, ifStyle } from "@utils";

import {
  blue,
  red,
  white,
  darkenGrey,
  disabledGrey,
  disabledDarkGrey,
} from "src/styles/colors";
import { buttonTypes } from "@enums";

const switchType = switchStyle("buttonType");
const isDisabled = ifStyle("disabled");

const {
  primary,
  warning,
  light,
  lightSecondary,
  link,
  linkSecondary,
  actionButton,
} = buttonTypes;

export const Image = styled.img`
  margin-right: 10px;
  opacity: ${isDisabled("0.5", "1")};
`;

export const Touchable = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${isDisabled("not-allowed", "pointer")};
  border-radius: 8px;
  font-size: ${switchType({
    [primary]: isDisabled("14px", "16px"),
    [warning]: isDisabled("14px", "16px"),
    [light]: isDisabled("14px", "16px"),
    [lightSecondary]: isDisabled("14px", "16px"),
    [link]: isDisabled("14px", "16px"),
    [linkSecondary]: "14px",
    [actionButton]: isDisabled("14px", "16px"),
  })};
  font-weight: ${switchType({
    [primary]: "bold",
    [warning]: "bold",
    [light]: "bold",
    [lightSecondary]: "bold",
    [link]: isDisabled("bold", "500"),
    [linkSecondary]: isDisabled("bold", "600"),
    [actionButton]: "bold",
  })};
  padding: 10px 1em;
  text-transform: ${switchType({
    [primary]: "uppercase",
    [warning]: "uppercase",
    [light]: "uppercase",
    [lightSecondary]: "uppercase",
    [link]: isDisabled("uppercase", "none"),
    [linkSecondary]: isDisabled("uppercase", "none"),
    [actionButton]: "uppercase",
  })};
  width: ${switchType({
    [primary]: "100%",
    [warning]: "100%",
    [light]: "100%",
    [lightSecondary]: "100%",
    [link]: isDisabled("100%", "auto"),
    [linkSecondary]: isDisabled("100%", "auto"),
    [actionButton]: "auto",
  })};
  border: ${isDisabled(
    "transparent",
    switchType({
      [primary]: `2px solid ${red}`,
      [warning]: `2px solid ${red}`,
      [light]: `2px solid transparent`,
      [lightSecondary]: `2px solid ${darkenGrey}`,
      [link]: "0px solid transparent",
      [linkSecondary]: "0px solid transparent",
      [actionButton]: "0px solid transparent",
    }),
  )};
  color: ${isDisabled(
    disabledDarkGrey,
    switchType({
      [primary]: `${white}`,
      [warning]: `${white}`,
      [light]: isDisabled(disabledGrey, red),
      [lightSecondary]: `${darkenGrey}`,
      [link]: `${blue}`,
      [linkSecondary]: `${blue}`,
      [actionButton]: `${red}`,
    }),
  )};
  background-color: ${switchType({
    [primary]: isDisabled(disabledGrey, red),
    [warning]: `${red}`,
    [light]: `${white}`,
    [lightSecondary]: `${white}`,
    [link]: "transparent",
    [linkSecondary]: "transparent",
    [actionButton]: "transparent",
  })};
  outline: none;
  line-height: ${switchType({
    [primary]: "normal",
    [warning]: "normal",
    [light]: "normal",
    [lightSecondary]: "normal",
    [link]: "22px",
    [linkSecondary]: "24px",
    [actionButton]: "normal",
  })};
  text-decoration: ${switchType({
    [primary]: "none",
    [warning]: "none",
    [light]: "none",
    [lightSecondary]: "none",
    [link]: "none",
    [linkSecondary]: "underline",
    [actionButton]: "none",
  })};
`;

export const IconWrapper = styled.div`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  margin: 0 7px;
  justify-content: center;
  align-items: center;
  opacity: ${isDisabled("0.5", "1")};
`;
