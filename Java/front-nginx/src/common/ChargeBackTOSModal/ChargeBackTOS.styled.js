import styled from "styled-components";
import { blackPointSeven } from "@colors";

export const StyledParagraph = styled.p`
  margin-bottom: 36px;
`;

export const ContentFooter = styled.div`
  margin-top: 24px;

  p {
    margin-bottom: 10px;
  }
`;

export const StyledError = styled(StyledParagraph)`
  height: 40vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LoadingWrapper = styled.div`
  &&& {
    position: fixed;
    height: 100%;
    width: 115vw;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    background: ${blackPointSeven};
    top: 0;
    margin-left: -27%;
    background-size: resize;
  }
`;
