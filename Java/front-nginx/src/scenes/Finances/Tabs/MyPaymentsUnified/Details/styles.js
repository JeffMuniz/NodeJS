import styled from "styled-components";

import { blue, darkenGrey, rgbaMediumGrey, whiteF2 } from "@colors";
import { Button as CommonButton } from "@common";

export const Button = styled(CommonButton)`
  font-size: 13px;
  font-weight: 800;
  height: 30px;
  padding: 0;
`;

export const Container = styled.div`
  background: ${whiteF2};
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  line-height: 26px;
  margin-bottom: 30px;
  padding: 44px 20px 20px;
`;

export const ContainerButton = styled.div`
  position: absolute;
`;

export const ContainerOrders = styled.div`
  margin-top: 30px;
`;

export const Column = styled.div`
  min-width: ${props => props.minWidth};
  max-width: 400px;
  border-right: ${props =>
    props.withVerticalBorder && `1px solid ${darkenGrey}`};
  padding-right: ${props => props.withVerticalBorder && "55px"};
`;

export const DetailButton = styled.button`
  background: transparent;
  color: ${blue};
  cursor: pointer;
  font-size: ${props => props.fontSize || "14px"};
  font-weight: ${props => props.fontWeight || "600"};
  line-height: 16px;
  border: none;
`;

export const Item = styled.div`
  padding-right: 10px;
  margin-top: ${props => props.marginTop};
`;

export const Label = styled.div`
  display: ${props => (props.vertical ? "block" : "inline-block")};
  font-size: ${props => (props.highlighted ? "17px" : "14px")};
  font-weight: ${props => (props.boldLabel || props.highlighted) && "bold"};
  width: ${props => props.widthLabel && "135px"};
  min-height: ${props => (props.highlighted ? "50px" : "30px")};
`;

export const Value = styled.div`
  display: ${props => (props.vertical ? "block" : "inline-block")};
  font-size: ${props => (props.highlighted ? "16px" : "14px")};
  font-weight: ${props => props.boldValue && "bold"};
  margin-left: ${props => props.vertical || props.marginLeft || "5px"};
  color: ${props => props.color};
  min-height: 30px;
`;

export const Line = styled.div`
  border-top: 1px solid ${darkenGrey};
`;

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  height: 100%;
  width: 100%;
`;

export const Row = styled.div`
  background-color: ${rgbaMediumGrey};
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 8px;
  padding: 16px 25px;
`;
