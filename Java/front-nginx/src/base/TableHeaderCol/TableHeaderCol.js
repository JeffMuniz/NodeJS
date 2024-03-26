import styled from "styled-components";

import { Col } from "react-styled-flexboxgrid";
import { ifStyle } from "@utils";

import { lighterBlack } from "src/styles/colors";

const hide = ifStyle("hide");

export const TableHeaderCol = styled(Col)`
  font-weight: 700;
  line-height: 26px;
  font-size: 13px;
  letter-spacing: 0.1px;
  color: ${lighterBlack};
  width: 155px;
  margin: auto;
  display: ${hide("none", "block")};
`;

export default TableHeaderCol;
