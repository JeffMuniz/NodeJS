import styled from "styled-components";
import { lighterBlack } from "src/styles/colors";

export const Wrapper = styled.div`
  color: ${lighterBlack};
  margin-bottom: 60px;
  text-align: left;
`;

export const Title = styled.span`
  display: block;
  font-size: 32px;
  font-weight: 300;
  margin-bottom: 28px;
`;

export const Subtitle = styled.span`
  font-size: 16px;
  letter-spacing: 0.1px;
  line-height: 26px;
`;
