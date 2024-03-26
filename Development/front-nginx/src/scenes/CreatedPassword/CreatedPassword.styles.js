import styled from "styled-components";
import { Col, Row } from "react-styled-flexboxgrid";

import { Icon } from "@common";
import { grey } from "@colors";

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
