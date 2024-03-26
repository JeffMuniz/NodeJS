import styled from "styled-components";
import { Button } from "@common";
import { ifStyle } from "@utils";
import { red, grey } from "@colors";

export const StyledButton = styled(Button)`
  width: 312px;
  height: 48px;
`;

const hasError = ifStyle("hasError");

export const Hint = styled.p`
  font-size: 14px;
  line-height: 23px;
  color: ${hasError(red, grey)};
  margin: 0;
`;

export const TextareaWrapper = styled.div`
  margin-top: 44px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 64px;
  margin-bottom: 80px;
`;

export const Section = styled.section`
  margin-top: 54px;
`;
