import styled from "styled-components";
import { TableHeader, TableHeaderCol, TableCol, TableRow } from "@base";
import { blue, grey } from "@colors";

export const THRow = styled(TableHeader)``;
export const THCol = styled(TableHeaderCol)`
  color: ${grey};
  font-size: 12px;
  line-height: 20px;
`;
export const TBRow = styled(TableRow)``;
export const TBCol = styled(TableCol)``;

export const EllipsisedCol = styled(TableCol)`
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const ButtonDetails = styled.button`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  margin-right: 5px;
  background: transparent;
  border: none;
  outline: none;

  color: ${blue};
  cursor: pointer;
`;
