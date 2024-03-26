import styled from "styled-components";

import { Row, Col as BaseCol } from "react-flexbox-grid";
import { darkenGrey, darkWhite } from "@colors";

export const Table = styled.div`
  min-height: 290px;
  overflow: hidden;
`;

export const HeaderRow = styled(Row)`
  background: ${darkWhite};
  border-bottom: 1px solid ${darkenGrey};
  margin: 0;
  padding: 5.5px 33px;
  justify-content: space-between;
`;

export const HeaderCol = styled(BaseCol)`
  text-align: center;
  line-height: 22px;
  font-size: 12px;
`;

export const ContentRow = styled(Row)`
  margin: 0;
  padding: 9px 33px;
  min-height: 61px;
  justify-content: space-between;
  border-bottom: 1px solid ${darkenGrey};
  :last-child {
    margin-bottom: 73px;
  }
`;

export const ContentCol = styled(BaseCol)`
  text-align: center;
  font-size: 14px;
  line-height: 24px;
  align-self: center;
`;

export const EllipsisedCol = styled(ContentCol)`
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
