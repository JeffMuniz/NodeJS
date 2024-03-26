import styledWeb from "styled-components";

import {
  inputBorder,
  darkBlack,
  veryLigtherGrey,
  inputPlaceholder,
  disabledGrey,
} from "@colors";
import { ifStyle } from "@utils";

const hasIcon = ifStyle("hasIcon");
const isDisabled = ifStyle("disabled");

export const WebInput = styledWeb.input`
  ::placeholder {
      color: ${inputPlaceholder};
    }
  background-color: ${isDisabled(disabledGrey, "")};
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
