import styled from "styled-components";

import { red, veryLightBlack } from "src/styles/colors";

import { ifStyle } from "@utils";

const hasError = ifStyle("hasError");

export const StyledLabel = styled.label`
  text-align: left;
  width: 100%;
`;

export const ErrorText = styled.span`
  color: ${red};
  font-size: 12px;
  letter-spacing: 0.1px;
  line-height: 18px;
  visibility: ${hasError("visible", "hidden")};
  min-height: 20px;
`;

export const LabelText = styled.span`
  color: ${veryLightBlack};
  opacity: ${({ disabled }) => (disabled ? "0.5" : "1")};
  font-size: 14px;
  font-weight: bold;
  line-height: 19px;
  letter-spacing: -0.3px;
  margin-bottom: 7px;
  display: block;
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;
