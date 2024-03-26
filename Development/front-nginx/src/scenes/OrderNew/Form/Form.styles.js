import styled from "styled-components";
import { Row } from "react-styled-flexboxgrid";

import {
  red,
  inputPlaceholder,
  disabledGrey,
  veryLigtherGrey,
  inputBorder,
  darkBlack,
} from "@colors";
import { ifStyle } from "@utils";

const hasIcon = ifStyle("hasIcon");
const isDisabled = ifStyle("disabled");

export const RowContent = styled(Row)`
  flex-direction: column;
  min-height: 250px;
  margin-top: 41px;
`;

export const RowFooter = styled(Row)`
  margin-bottom: 116px;
`;

export const LabelUpload = styled.label`
  font-weight: 700;
  line-height: normal;
  font-size: 14px;
  letter-spacing: -0.3px;
  text-transform: uppercase;
  color: ${red};
  display: inline-flex;
  margin: 15px 0 0;
  border: none;
  cursor: pointer;
  background: transparent;
  align-items: center;
`;

export const fileInput = {
  display: "none",
};

export const Title = styled.h3`
  font-weight: 600;
  margin-bottom: 22px;
  margin-left: 20px;
`;

export const InputContainer = styled.div`
  padding-left: 40px;
  padding-top: 10px;
`;

export const DatePlaceholder = styled.div`
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
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 100;
  font-size: 14px;
  height: 40px;
  outline: none;
  overflow: hidden;
  padding: 0 25px 0 ${hasIcon("40px", "15px")};
  width: 100%;
`;

export const CancelButtonContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 10px 0px;
`;
