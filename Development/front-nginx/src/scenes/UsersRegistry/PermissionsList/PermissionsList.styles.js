import styled from "styled-components";

import { darkGrey, lighterBlack } from "@colors";

export const ItemWrapper = styled.div`
  background-color: ${darkGrey};
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  padding: 26px 30px;
`;

export const ItemText = styled.p`
  font-family: Open Sans, sans-serif;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.1px;
  line-height: 26px;
  color: ${lighterBlack};
  margin: 0;
  padding: 0;
`;

export const ListWrapper = styled.div`
  margin-top: 30px;
`;
