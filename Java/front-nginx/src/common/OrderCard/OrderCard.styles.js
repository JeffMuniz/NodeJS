import styled from "styled-components";
import { Row, Col } from "react-styled-flexboxgrid";
import { ifStyle } from "@utils";
import { darkWhite, black, blue, white, whiteF2, shark } from "@colors";

const hasOrderDate = ifStyle("orderDate");

export const Container = styled(Row)`
  min-height: 75px;
  margin: auto auto 8px;
  display: flex;
  padding: 16px 24px;
  background: ${hasOrderDate(whiteF2, darkWhite)};
  position: relative;
`;

export const Item = styled(Col)`
  display: inline-block;
  height: 46px;
  margin: auto;
  min-width: ${props => (props.minWidth ? props.minWidth : "130px")};
  position: relative;
`;

export const ItemButton = styled(Item)`
  display: inline-flex;
  padding-right: 0px;
  padding-left: 0px;
`;

export const ItemContent = styled.span`
  display: inline-block;
  font-size: 14px;
  font-weight: bold;
  text-align: left;
  overflow: hidden;
  color: ${props => props.color || black};
`;

export const ItemTitle = styled(ItemContent)`
  font-weight: normal;
  line-height: 22px;
  font-size: 12px;
  text-align: left;
  display: block;
`;

export const StatusIcon = styled(ItemContent)`
  margin-left: 40px;
  width: 20px;
  height: 22px;
  display: grid;
`;

export const ActionButtonIcon = styled.div`
  position: relative;
  cursor: pointer;
`;

export const ActionButton = styled.button`
  width: 215px;
  padding: 20px 0;
  text-align: center;
  background: ${white};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  position: absolute;
  content: "Cancelar pedido";
  z-index: 1;
  right: 37px;
  top: 37px;
  margin: 7px 0;
  line-height: 26px;
  font-size: 16px;
  letter-spacing: 0.1px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  user-select: none;
  outline: none;
`;

export const ButtonDetails = styled.button`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 24px;
  margin-right: 5px;
  background: transparent;
  border: none;
  outline: none;

  color: ${blue};
  cursor: pointer;
`;

export const OrderStatus = styled.div`
  display: flex;
  line-height: 26px;
  font-size: 14px;
  font-weight: bold;
  color: ${({ color }) => color || shark};
`;

export const PaymentStatus = styled.div`
  line-height: 26px;
  font-size: 14px;
  font-weight: bold;
  color: ${({ color }) => color || shark};
`;

export const PaymentStatusTitle = styled(ItemTitle)``;
