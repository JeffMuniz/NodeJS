import styled from "styled-components";

import { red, gainsboro } from "@colors";

export const Option = styled.div`
  border: 1px solid ${props => (props.selected ? red : gainsboro)};
  color: ${props => (props.selected ? red : gainsboro)}
  border-radius: 38px;
  padding: 7px;
  min-width: 115px;
  text-align: center;
  display: inline-block;
  cursor: pointer;
  margin-right: 10px;
  font-size: 14px;
  font-weight: 300;
  user-select: none;
`;

export const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

export const Span = styled.span`
  margin-right: 25px;
`;
