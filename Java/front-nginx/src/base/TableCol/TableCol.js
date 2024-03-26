import styled from "styled-components";

import { Col } from "react-styled-flexboxgrid";
import { ifStyle } from "@utils";

const hide = ifStyle("hide");

export const TableCol = styled(Col)`
  display: ${hide("none", "block")};
  margin: auto;
  line-height: 26px;
  font-size: 13px;
  letter-spacing: 0.1px;
  overflow-wrap: break-word;
`;

export default TableCol;
