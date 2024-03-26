import styled from "styled-components";
import { Grid } from "react-styled-flexboxgrid";
import { white, black } from "@colors";
import { Button } from "@common";

export const StyledGrid = styled(Grid)`
  margin-bottom: 30px;
  min-height: 114px;
  background-color: ${({ backgroundColor }) => backgroundColor || white};
  color: ${({ color }) => color || black};
  display: flex;
  align-items: center;
  border-radius: 4px;
  position: relative;
`;

export const IconWrapper = styled.div`
  flex-shrink: 0;
  width: 74px;
  height: 74px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 50%;
`;

export const Icon = styled.img`
  height: 35px;
  width: 35px;
`;

export const StyledButton = styled(Button)`
  flex-shrink: 0;
  width: 240px;
  height: 48px;
  margin-left: auto;
  font-size: 14px;
`;

export const CloseBtnWrapper = styled.div`
  position: absolute;
  right: -16px;
  top: -16px;
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background: ${white};
  box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const Title = styled.h1`
  font-weight: bold;
  font-size: 16px;
  color: ${black};
  display: block;
  margin: 0;
`;

export const Content = styled.div`
  font-size: 16px;
  margin-left: 26px;
  margin-right: 45px;
`;
