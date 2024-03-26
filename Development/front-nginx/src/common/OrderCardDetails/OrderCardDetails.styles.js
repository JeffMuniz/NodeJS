import styled from "styled-components";
import { Button as CommonButton } from "@common";
import {
  lighterBlack,
  white,
  whiteF2,
  shark,
  darkenGrey,
  grey,
  blue,
  black,
} from "@colors";

export const ActionButton = styled.button`
  width: 215px;
  padding: 20px 0;
  text-align: center;
  background: ${white};
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  position: absolute;
  content: "Cancelar pedido";
  z-index: 1;
  right: -3em;
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

export const ActionButtonIcon = styled.div`
  display: inline-block;
  position: absolute;
  cursor: pointer;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${whiteF2};
  min-height: 160px;
  margin: -20px auto 25px;
  padding: 16px 24px;
  position: relative;

  > div {
    min-width: 200px;
    margin: 0.5em;
  }
`;

export const ContainerHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  > div {
    display: flex;
    flex-direction: column;
  }
`;

export const ContainerButton = styled.div``;

export const ItemEmployeesLabel = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;

  & span {
    width: 80px;
    text-align: center;
  }
`;

export const ItemLabel = styled.span`
  width: 80px;
  font-size: 12px;
  font-weight: normal;
  text-align: center;
`;

export const Item = styled.div`
  display: grid;
`;

export const ItemCard = styled.div`
  margin-top: 20px;
  flex-grow: 1;
`;

export const ItemStatus = styled.div`
  display: grid;

  > div {
    padding-right: 40px;
  }
`;

export const BorderVertical = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 10px;

  > div {
    flex-grow: 1;
    max-height: 75%;
    border-right: 1px solid #9b9b9b4c;
    margin-top: 30px;
  }
`;

export const StatusLabel = styled.span`
  color: ${props => props.iconColor};
`;

export const ItemRowsLabel = styled.div`
  display: inline-block;
  font-size: 14px;
  font-weight: 300;
  line-height: 30px;
`;

export const ItemTitleLink = styled.div`
  color: blue;
`;

export const Link = styled.a`
  font-size: 16px;
  color: ${blue};
  cursor: pointer;
  display: inline-flex;
  line-height: 22px;
  font-weight: 600;
`;

export const ItemRows = styled.span`
  font-size: 14px;
  font-weight: ${props => (props.fontWeight ? "bold" : "300")};
  line-height: 30px;
`;

export const ItemFlex = styled(Item)`
  border-bottom: ${props =>
    props.borderBottom ? `1px solid ${darkenGrey}` : "none"};
  display: flex;
  justify-content: start;
  padding-right: 20px;
`;

export const ItemContent = styled.span`
  font-size: 14px;
  font-weight: ${props => (props.fontWeight ? "normal" : 700)};
  line-height: 30px;
  margin-right: 5px;
  text-align: left;
  overflow: hidden;
  color: ${props => props.color || black};

  > div {
    margin-left: 9px;
  }
`;

export const Separator = styled.hr`
  margin-left: opx;
  width: 0px;
  height: 110px;
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

export const Button = styled(CommonButton)`
  font-size: 13px;
  padding: 0;
  margin: 0;
  font-weight: 800;
  width: 100%;
  justify-content: flex-end;
  user-select: none;
`;

export const ItemEmployees = styled.span`
  font-weight: bold;
  font-size: ${props => (props.fontWeight ? "14px" : "30px")};
  font-weight: ${props => (props.fontWeight ? "300" : "bold")};
`;

export const ItemContentDiscount = styled.span`
  font-size: 12px;
  font-weight: 700;
  line-height: 30px;
  margin-right: 5px;
  text-align: left;
  overflow: hidden;
  color: ${grey};
  padding-left: 5px;

  > div {
    margin-left: 9px;
  }
`;

export const ItemContentSize = styled(ItemContent)`
  min-width: 130px;
`;

export const ItemTitle = styled(ItemContent)`
  color: ${props => props.isLink && blue};
  cursor: ${props => props.isLink && "pointer"};
  font-weight: ${props => (props.isLink ? 700 : 300)};
  text-align: left;
`;

export const ItemPosition = styled.div`
  display: inline-block;
  position: absolute;
`;

export const ItemValue = styled.span`
  font-size: 14px;
  font-weight: ${props => (props.fontWeight ? "normal" : 700)};
  line-height: 30px;
  margin-right: 5px;
  text-align: left;
  overflow: hidden;
  color: ${props => props.color || lighterBlack};
  ${props => props.left && `padding-left: ${props.left}px`};

  > div {
    margin-left: 9px;
  }
`;

export const PaymentStatus = styled.span`
  font-size: 14px;
  font-weight: 700;
  text-align: left;
  color: ${({ color }) => color || shark};
  display: inline-block;
  line-height: 30px;
`;

export const StatusIcon = styled(ItemContent)``;

export const Title = styled(ItemContent)`
  font-size: 18px;
  font-weight: 700;
`;

export const TitleContent = styled(ItemContent)`
  font-size: 16px;
  font-weight: 300;
`;

export const TitleColumn = styled.div`
  height: 30px;
  line-height: 30px;
`;
