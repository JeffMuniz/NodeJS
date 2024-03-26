import styled from "styled-components";

import { Row } from "react-styled-flexboxgrid";

import { ligthGrey } from "src/styles/colors";

export const TableHeader = styled(Row)`
  background: ${ligthGrey};
  border-top: 1px solid rgba(155, 155, 155, 0.3);
  border-bottom: 1px solid rgba(155, 155, 155, 0.3);
  margin-top: 10px;
  margin-left: 0 !important;
  margin-right: 0 !important;
  height: 49px;
`;

export default TableHeader;
