import styled from "styled-components";

import { lighterBlack, dustyGray, blue, shark } from "@colors";
import { ifStyle } from "@utils";

export const valueDefault = "0.000,00";

const hasColor = ifStyle("color");

export const WrapperBalance = styled.div`
  margin-left: 37px;
  margin-top: 30px;
`;

export const RowTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Title = styled.span`
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  line-height: 26px;
  margin-right: 10px;

  display: flex;
  align-items: center;

  color: ${lighterBlack};
`;

export const ValueTotal = styled.span`
  font-family: Barlow;
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 40px;

  letter-spacing: 0.3px;

  color: ${({ children }) =>
    children[1] !== valueDefault ? shark : dustyGray};
`;

export const RowExtract = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: pre-line;
`;

export const ButtonExtract = styled.span`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  margin-right: 5px;

  color: ${blue};
  cursor: pointer;
`;

export const Description = styled.span`
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;

  color: ${hasColor(shark, dustyGray)};
`;
