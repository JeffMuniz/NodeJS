import styled from "styled-components";
import { Row } from "react-flexbox-grid";
import { veryLigtherGrey } from "@colors";

export const Flag = styled.span`
  display: inline-flex;
  top: -23px;
  right: 15px;
  position: relative;
  width: 15px;
`;

export const RowView = styled(Row)`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

export const Eye = styled.span`
  display: inline-flex;
  margin-right: 10px;
  top: -31px;
  right: 15px;
  position: relative;
  width: 15px;
  color: ${veryLigtherGrey};
  margin-bottom: -20px;
`;
