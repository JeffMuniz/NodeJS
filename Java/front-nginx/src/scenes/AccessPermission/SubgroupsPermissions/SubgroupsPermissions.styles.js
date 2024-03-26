import styled from "styled-components";

import { TableCol, TableRow } from "@base";
import { ifStyle } from "@utils";

const iconCol = ifStyle("right");

export const SubgroupRow = styled(TableRow)`
  background-color: rgba(190, 190, 190, 0.2);
  margin-bottom: 8px;
  padding: 16px 32px;
  cursor: pointer;
`;

export const SubgroupCol = styled(TableCol)`
  text-align: ${iconCol("right", "left")};
  padding: 0 0 0 16px;
  font-weight: 600;
  font-size: 16px;
`;
