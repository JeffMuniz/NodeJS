import styled from "styled-components";
import { Row } from "react-styled-flexboxgrid";

import { dustyGray } from "@colors";
import { divider } from "@assets";

export const Divider = styled.div`
  background: url(${divider}) center no-repeat;
  margin: 30px auto 0;
  width: 100px;
  height: 10px;
`;

export const Text = styled.p`
  width: 630px;
  font-size: 20px;
  color: ${dustyGray};
  display: block;
  margin: auto;
  text-align: center;
`;

export const RowStyled = styled(Row)`
  margin-top: 40px;
  margin-bottom: 50px;
  justify-content: center;
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
