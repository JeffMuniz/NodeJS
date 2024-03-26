import styled from "styled-components";
import { Row } from "react-styled-flexboxgrid";

import { Button } from "@common";
import { ifStyle } from "@utils";
import { blackPointSeven, red, grey } from "@colors";

const hasError = ifStyle("hasError");

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 64px;
  margin-bottom: 80px;
`;

export const StyledRow = styled(Row)`
  &&& {
    margin: 0;
    padding: 0;
  }
`;

export const Header = styled(StyledRow)`
  display: block;
`;

export const Hint = styled.p`
  font-size: 14px;
  line-height: 23px;
  color: ${hasError(red, grey)};
  margin: 0;
`;

export const Section = styled.section`
  margin-top: 54px;
`;

export const StyledButton = styled(Button)`
  width: 312px;
  height: 48px;
`;

export const TextareaWrapper = styled.div`
  margin-top: 44px;
`;

export const Title = styled.h1`
  font-size: 28px;
  line-height: 38px;
  margin: 0px 0px 5px;
  font-weight: normal;
`;

export const LoadingWrapper = styled.div`
  &&& {
    position: fixed;
    height: 100%;
    width: 112vw;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    background: ${blackPointSeven};
    top: 0;
    margin-left: -18%;
    background-size: resize;
  }
`;
