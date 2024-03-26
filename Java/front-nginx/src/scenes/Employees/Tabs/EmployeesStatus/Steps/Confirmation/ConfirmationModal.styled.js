import styled from "styled-components";

import { shark } from "@colors";

export const Bold = styled.span`
  font-weight: 600;
`;

export const ContentWrapper = styled.div`
  color: ${shark};
  margin-bottom: 60px;
`;

export const StyledParagraph = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.1px;
  margin: 0 0 ${({ margin }) => margin || "15px"};
`;
