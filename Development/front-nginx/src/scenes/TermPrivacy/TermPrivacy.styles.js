import styled from "styled-components";
import { Col, Row } from "react-styled-flexboxgrid";

import { Icon } from "@common";
import { grey, blackPointSeven } from "@colors";

export const CentralizedCol = styled(Col)`
  text-align: center;
`;

export const SuccessIcon = styled(Icon)`
  margin-top: 60px;
`;
export const WrapperTitle = styled(Col)`
  text-align: left;
  margin-left: -75px;
`;

export const WrapperDescription = styled(Col)``;

export const Title = styled.h2`
  font-size: 32px;
  margin-top: 30px;
  line-height: 40px;
  font-weight: 300;
  letter-spacing: 0.5px;
  color: ${grey};
`;

export const Description = styled.span`
  color: ${grey};
  margin-left: -65px;
  font-size: 14px;
  line-height: 23px;
`;

export const RowButton = styled(Row)`
  margin-top: 130px;
`;

export const StyledParagraph = styled.p`
  text-align: left;
  margin-bottom: 36px;
`;

export const StyledSubParagraph = styled.p`
  text-align: left;
  margin-bottom: 36px;
  padding: 15px;
  font-size: 15px;
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
