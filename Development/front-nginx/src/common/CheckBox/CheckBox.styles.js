import styledWeb from "styled-components";
import Icon from "src/common/Icon/Icon";
import { ifStyle } from "@utils";

import {
  grey,
  darkWhite,
  darkGrey,
  lighterGreen,
  white,
} from "src/styles/colors";

const isStrongFont = ifStyle("strongFont");

export const StyledLabel = styledWeb.label`
  position: relative;
  display: inline-flex;
  justify-content: center;
  align-items: center;
`;

export const SpanBox = styledWeb.span`
  display: inline-block;
  position: relative;
  border-radius: 4px;
  background-color: ${darkWhite};

  ${props =>
    props.isBig
      ? `
        height: 32px;
        width: 32px;

        & > svg {
          position: absolute;
          top: 8px;
          left: 6px;
        }
      `
      : `
        height: 16px;
        width: 16px;
        position: absolute;
        top: 3px;
        left: 0;

        & > svg {
          position: absolute;
          top: 4px;
          left: 3px;
        }
      `};
`;

export const Box = styledWeb.input`
  position: absolute;
  left: -999999px;
  top: 0;
  cursor: pointer;

  &:checked ~ ${SpanBox} {
    background-color: ${lighterGreen};
    border: 1px solid ${lighterGreen};
  }

  &:not(:checked) ~ ${SpanBox} {
    border: ${props =>
      props.borderColor
        ? `1px solid ${props.borderColor}`
        : `1px solid ${darkGrey}`} ;

    & > svg {
      opacity: 0;
    }
  }
`;

export const TextError = styledWeb.span`
  color: red;
  font-size: 16px;
  padding: 10px;
`;

export const Description = styledWeb.span`
  color: ${grey};
  font-size: 14px;
  font-weight: ${isStrongFont("700", "400")};
  line-height: 24px;
  margin: 0 30px;
`;

export const Wrapper = styledWeb.div`
  margin: 10px 0;
  width: 100%;
`;

export const CheckIcon = styledWeb(Icon)`
  & > path {
    fill: ${white};
  }
`;
