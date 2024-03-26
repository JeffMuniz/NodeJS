import styled from "styled-components";

import { Button as CommonButton } from "@common";

import { white, persianRed } from "@colors";

export const Button = styled(CommonButton)`
  padding: 0;
  margin: 0;
  width: 100%;
  justify-content: flex-end;
  user-select: none;
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
  margin: 7px -195px;
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
  background: ${({ icon }) => `url(${icon}) center no-repeat`};
  margin: 0;
  padding: 0;
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const ChargeCancelledText = styled.span`
  font-style: italic;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
  color: ${persianRed};
  float: right;
`;

export const StatusIcon = styled.div``;

export const StatusLabel = styled.span`
  font-weight: bold;
  color: ${props => props.color};
`;
