import styled from "styled-components";

import { lighterBlack } from "@colors";

export const SubtitleWrapper = styled.h2`
  display: flex;
  justify-content: space-between;
  margin-right: 10px;
`;

export const SubTitle = styled.span`
  color: ${lighterBlack};
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 26px;
  letter-spacing: 0.1px;
`;
