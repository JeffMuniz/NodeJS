import styledWeb from "styled-components";

import InputMask from "react-input-mask";

import {
  inputBorder,
  darkBlack,
  veryLigtherGrey,
  inputPlaceholder,
} from "src/styles/colors";

import { ifStyle } from "@utils";

const hasIcon = ifStyle("hasIcon");

export const WebInput = styledWeb.input`
  ::placeholder {
      color: ${inputPlaceholder};
    }
  background-color: ${({ disabled }) =>
    disabled ? "rgba(248,248,248,0.5)" : ""};
  border-color: ${veryLigtherGrey};
  border-radius: 8px;
  border: 1px solid ${({ colorBorder }) => colorBorder || inputBorder};
  border-spacing: 0;
  border-collapse: separate;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  color: ${darkBlack};
  cursor: default;
  display: table;
  font-weight: 100;
  font-size: 14px;
  height: 40px;
  outline: none;
  overflow: hidden;
  padding: 0 25px 0  ${hasIcon("40px", "15px")};
  width: 100%
`;

export const TextInputWithMask = WebInput.withComponent(InputMask);
