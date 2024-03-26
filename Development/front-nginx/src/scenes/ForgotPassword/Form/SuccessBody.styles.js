import styled from "styled-components";
import { Row, Col } from "react-flexbox-grid";
import { grey, darkGrey } from "@colors";

export const LittleLine = styled.div`
  background: ${darkGrey};
  height: 2px;
  border-radius: 1px;
  margin: 26px auto 52px;
  width: 80px;
`;

export const StyledColSuccess = styled(Col)`
  display: flex;
  justify-content: center;
  font-style: normal;
  font-weight: 300;
  font-size: 20px;
  line-height: 30px;
  color: ${grey};
`;

export const LastCol = styled(StyledColSuccess)`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 26px;
  letter-spacing: 0.45px;
`;

export const RowButton = styled(Row)`
  margin-top: 133px;
  margin-bottom: 75px;
`;

export const Br = styled.br``;
