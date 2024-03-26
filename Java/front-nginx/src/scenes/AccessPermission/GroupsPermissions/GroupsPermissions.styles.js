import styled from "styled-components";

import { TableHeaderCol, TableCol } from "@base";
import { blue } from "@colors";

export const StyledTableHeaderCol = styled(TableHeaderCol)`
  text-align: left;
`;

export const StyledTableCol = styled(TableCol)`
  text-align: left;
  text-transform: ${props => (props.capitalize ? "capitalize" : "none")};
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
