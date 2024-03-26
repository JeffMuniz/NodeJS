import styled from "styled-components";
import { Row } from "react-styled-flexboxgrid";

import { lighterBlack, blackPointSeven } from "@colors";

export const StyledRow = styled(Row)`
  &&& {
    margin: 0;
    padding: 0;
  }
`;

export const Header = styled(StyledRow)`
  display: block;
`;

export const Title = styled.h1`
  font-size: 28px;
  line-height: 38px;
  margin: 0px 0px 5px;
  font-weight: normal;
`;

export const Subtitle = styled.h2`
  font-size: 16px;
  line-height: 26px;
  letter-spacing: 0.1px;
  color: ${lighterBlack};
  margin: 0 0 20px;
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
