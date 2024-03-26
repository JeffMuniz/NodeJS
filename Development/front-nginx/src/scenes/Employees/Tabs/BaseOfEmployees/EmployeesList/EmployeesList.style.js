import styled from "styled-components";

import { TableCol, Link } from "@base";

export const EmployeeNumber = styled(TableCol)`
  word-break: break-all;
`;

export const ButtonActions = styled(TableCol)`
  text-align: right;
`;

export const RouterLink = styled(Link)`
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
  max-width: 155px;
  white-space: nowrap;
`;

export const AddressCol = styled(TableCol)`
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
