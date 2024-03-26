import styled from "styled-components";
import { lighterBlack } from "src/styles/colors";

export const Wrapper = styled.header`
  color: ${lighterBlack};
  margin-bottom: 20px;
  text-align: left;
`;

export const Title = styled.h1`
  font-family: Barlow; sans-serif;
  display: block;
  font-size: 32px;
  font-weight: 600;
  letter-spacing: 0.3px;
  line-height: 40px;
  margin: 0;
  padding: 0;
`;

export const Subtitle = styled.span`
  display: block;
  font-size: 16px;
  letter-spacing: 0.1px;
  line-height: 26px;
  margin: 0;
  padding: 0;
`;
