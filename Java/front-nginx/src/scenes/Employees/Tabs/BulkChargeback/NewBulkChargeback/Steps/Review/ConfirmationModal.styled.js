import styled from "styled-components";

import { shark } from "@colors";

export const ContentWrapper = styled.div`
  color: ${shark};
  margin-bottom: 92px;
`;

export const TotalValue = styled.p`
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  line-height: 24px;
  letter-spacing: 0.1px;
  margin: 0 0 24px;
`;

export const StyledParagraph = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.1px;
  margin: 0 0 ${({ margin }) => margin || "15px"};
`;

export const Bold = styled.span`
  font-weight: 600;
`;
