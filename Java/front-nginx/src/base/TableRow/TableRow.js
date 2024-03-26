import styled from "styled-components";

import { Row } from "react-styled-flexboxgrid";

import { darkGrey } from "src/styles/colors";

export const TableRow = styled(Row)`
  margin-left: 0 !important;
  margin-right: 0 !important;
  padding: 5px 0px 5px;
  border-bottom: 1px solid ${darkGrey};
  min-height: 60px;
`;

export default TableRow;
