import styled from "styled-components";
import { Col, Row } from "react-styled-flexboxgrid";
import { darkGrey, black } from "src/styles/colors";

export const Container = styled.div`
  margin: 35px 0 0;
  padding: 0 12px;
`;

export const HeaderRow = styled(Row)`
  background: rgba(216, 216, 216, 0.15);
  border-top: 1px solid rgba(155, 155, 155, 0.2);
  border-bottom: 1px solid rgba(155, 155, 155, 0.2);
  padding: 12px 37px;
  font-size: 14px;
  line-height: 26px;
  font-weight: bold;
`;

export const BodyRow = styled(Row)`
  border-bottom: 1px solid ${darkGrey};
  color: ${black};
  font-weight: ${300};
  font-size: 14px;
  padding: 16px 37px;
`;

export const StyledCol = styled(Col)`
  text-align: center;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  text-align: ${({ align }) => align || "left"};
  color: ${({ color }) => color};
  padding-right: 10px;
`;

export const Bold = styled.b``;
