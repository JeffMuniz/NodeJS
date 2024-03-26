import styled from "styled-components";

import { TableCol, TableHeaderCol as BaseTableHeaderCol } from "@base";
import { blue, shark } from "@colors";

export const RouterLink = styled.p`
  font-size: 14px;
  font-weight: bold;
  line-height: 19px;
  text-decoration: none;
  color: ${blue};
  cursor: pointer;
`;

export const Text = styled(TableCol)`
  &&& {
    word-break: break-all;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 14px;
    line-height: 19px;
    color: ${props => props.fill || shark};
    padding-left: 0;
    padding-right: 0;
  }
`;

export const TableHeaderCol = styled(BaseTableHeaderCol)`
  &&& {
    padding-left: 0;
    padding-right: 0;
  }
`;
