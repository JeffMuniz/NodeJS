import styled from "styled-components";
import { Button } from "@common";
import { shark, grey } from "@colors";
import { ifStyle } from "@utils";

const hasYScroll = ifStyle("contentHasScroll");

export const Container = styled.div`
  width: ${({ width }) => width || "950px"};
  height: ${({ height }) => height || "80vh"};
  max-height: ${({ maxHeight }) => maxHeight || "771px"};
  box-sizing: border-box;
  padding: ${({ padding }) => padding || "33px 40px 48px 40px"};
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const Content = styled.div`
  max-height: 522px;
  overflow-y: ${hasYScroll("scroll", "none")};
  margin-top: 30px;
`;

export const Title = styled.h1`
  font-weight: 300;
  font-size: 32px;
  line-height: 40px;
  color: ${shark};
  margin: 0;
`;

export const Subtitle = styled.h2`
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.1px;
  color: ${grey};
  margin: 12px 0 0 0;
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 17px;
  border-top: 1px solid rgba(155, 155, 155, 0.3);
  padding-top: 32px;
`;

export const StyledButton = styled(Button)`
  width: 236px;
  height: 48px;
`;
