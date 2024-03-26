import styled from "styled-components";
import { Col, Row } from "react-styled-flexboxgrid";

import { darkGrey, green, persianRed } from "src/styles/colors";

import { ifStyle } from "@utils";

const isCancelled = ifStyle("isCancelled");

export const Container = styled.div`
  margin: 35px 0 0;
  padding: 0 12px;
`;

export const Grid = styled.div`
  padding: 0 8px;
  margin-bottom: 49px;
`;

export const HeaderRow = styled(Row)`
  background: ${darkGrey};
  height: 40px;
`;

export const BodyRow = styled(Row)`
  height: 60px;
  border-bottom: 1px solid ${darkGrey};
  color: ${props => (props.iscreditpayment === "true" ? green : persianRed)};
  font-weight: 700;
  font-size: 14px;
`;

export const StyledCol = styled(Col)`
  text-align: center;
  margin: auto;
  text-decoration: ${isCancelled("line-through", "none")};
`;

export const StoreNameText = styled.span`
  text-decoration: ${isCancelled("line-through", "none")};
`;

export const SelectWrapper = styled.div`
  display: block;
  padding: 0;
  margin: 0 auto 10px 0;
`;

export const PeriodLabel = styled.p`
  display: inline-block;
  margin-right: 5px;
`;

export const DropDown = styled.div`
  width: 300px;
  display: inline-block;
`;

export const CardTabs = styled.div`
  padding: 0 8px;
  margin: 3px 0;
`;

export const Separator = styled.div`
  border-bottom: 1px solid ${darkGrey};
  margin: 0;
  padding: 0;
`;
