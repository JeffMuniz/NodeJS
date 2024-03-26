import styled from "styled-components";
import { Button as CommonButton } from "@common";

import {
  shark,
  green,
  red,
  whiteF2,
  inputPlaceholder,
  darkenGrey,
  black,
  blue,
} from "@colors";

import { ifStyle } from "@utils";

const isGreen = ifStyle("green");

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${whiteF2};
  min-height: 75px;
  margin-top: -20px;
  padding: 30px;
`;

export const ContainerTitle = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ContainerItem = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ItemTitleLink = styled.div`
  color: blue;
  font-weight: 700;
`;

export const Button = styled(CommonButton)`
  font-size: 13px;
  font-weight: 800;
  padding: 0;
  margin: 0;
  width: 100%;
  justify-content: flex-start;
  user-select: none;
`;

export const Item = styled.div`
  display: inline-flex;
  flex-direction: column;
  font-size: 14px;
  min-height: 30px;
  margin-top: 20px;
`;

export const ItemValueTotal = styled.div`
  padding-right: 9em;
`;

export const ItemFlex = styled.div`
  border-bottom: ${props =>
    props.borderBottom ? `1px solid ${darkenGrey}` : "none"};
  display: flex;
  flex-direction: inherit;
  justify-content: start;
  align-items: center;
`;

export const ItemValue = styled.span`
  font-size: 14px;
  font-weight: ${props => (props.fontWeight ? "normal" : 700)};
  line-height: 30px;
  margin-right: 5px;
  text-align: left;
  overflow: hidden;
  color: ${black};

  > div {
    margin-left: 9px;
  }
`;

export const ContainerEmployees = styled.div`
  display: flex;
`;

export const StatusLabel = styled.span`
  color: ${props => props.color};
  font-weight: 700;
  line-height: 30px;
`;

export const ItemEmployeesTotal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  font-weight: bold;
  padding-top: 10px;

  @media (min-width: 64em) {
    flex-direction: row;
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-right: 10px;
    align-items: center;
    &:last-child {
      margin-right: 0px;
    }
  }
`;

export const ItemEmployees = styled.span`
  font-weight: bold;
  font-size: ${props => (props.fontWeight ? "14px" : "30px")};
  font-weight: ${props => (props.fontWeight ? "300" : "bold")};
`;

export const ItemLabel = styled.span`
  width: 80px;
  font-size: 12px;
  font-weight: normal;
  text-align: center;
`;

export const ItemEmployeesLabel = styled.span`
  font-weight: bold;
  font-size: ${props => (props.fontWeight ? "12px" : "30px")};
  font-weight: ${props => (props.fontWeight ? "normal" : "bold")};
  text-align: center;
  width: 80px;
`;

export const ItemKey = styled.span`
  display: inline-block;
  font-weight: 300;
  line-height: 30px;
  text-align: left;
`;

export const ItemValueSample = styled.span`
  display: inline-block;
  font-weight: bold;
  line-height: 30px;
`;

export const ItemKeySize = styled(ItemKey)`
  color: ${props => props.isLink && blue};
  cursor: ${props => props.isLink && "pointer"};
  font-weight: ${props => (props.isLink || props.fontWeight ? 700 : 300)};
  line-height: 30px;
  min-width: 130px;
`;

export const ItemPosition = styled.div`
  display: inline-block;
`;

export const ColoredItemKey = styled(ItemValue)`
  color: ${isGreen(green, red)};
  margin-left: 0;
`;

export const Line = styled.div`
  background: ${props => (props.color ? `${inputPlaceholder}` : "transparent")};
  height: 1px;
  margin: 10px 0;
`;

export const TitleRow = styled.div`
  margin-bottom: 10px;
  line-height: 30px;
`;

export const Title = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

export const TitleColumn = styled.div`
  height: 30px;
  line-height: 30px;
  left: ${props => props.positionLeft && "-10px"};
  position: ${props => props.positionLeft && "relative"};
`;

export const TitleValue = styled.span`
  font-size: 16px;
  margin-left: 5px;
`;

export const PaymentStatus = styled.div`
  color: ${({ color }) => color || shark};
  display: inline-block;
  font-size: 14px;
  text-align: left;
  margin-left: 5px;
`;

export const StatusIcon = styled(ItemValue)``;
