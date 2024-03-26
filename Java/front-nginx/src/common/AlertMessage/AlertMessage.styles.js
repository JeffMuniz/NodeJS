import styled from "styled-components";
import { warningYellow, persianRed } from "@colors";

export const Container = styled.div`
  width: ${({ width }) => width};
  height: ${({ height }) => height || "auto"};
  padding: 34px 24px 24px 24px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const IconWrapper = styled.div`
  margin-bottom: ${props => (props.iconName === "error" ? "0" : "17px")};
`;

export const Title = styled.h1`
  color: ${props => (props.iconName === "error" ? persianRed : warningYellow)};
  font-style: normal;
  font-weight: bold;
  font-size: ${props => (props.iconName === "error" ? "20px" : "28px")};
  line-height: 37px;
  letter-spacing: 0.3px;
  margin: 0;
  margin-bottom: 12px;
`;

export const Message = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 26px;
  text-align: center;
  padding: 0;
`;

export const Footer = styled.div`
  margin-top: 22px;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
