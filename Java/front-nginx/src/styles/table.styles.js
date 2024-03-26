import styled from "styled-components";
import { whiteF2, darkenGrey, lighterBlack } from "@colors";

export const Table = styled.table`
  width: 100%;
  margin-top: ${props => !props.marginLess && "24px"};
  border-collapse: collapse;
  border-spacing: 0;
`;

export const Thead = styled.thead`
  background: ${whiteF2};
  border-bottom: 1px solid ${darkenGrey};
  height: 34px;
`;

export const Tbody = styled.tbody``;

export const Th = styled.th`
  padding-left: 12px;
  text-align: left;
  line-height: 22px;
  font-size: 12px;
  letter-spacing: 0.1px;
  font-weight: normal;
  width: ${props => props.width && props.width};
  text-align: ${props => props.centered && "center"};
`;

export const Tr = styled.tr``;

export const Td = styled.td`
  border-bottom: 1px solid ${darkenGrey};
  font-size: 14px;
  min-height: 61px;
  color: ${lighterBlack};
  padding: 1.125rem 12px;
  vertical-align: middle;
  word-break: ${props => props.ellipsis && "break-all"};
  text-overflow: ${props => props.ellipsis && "ellipsis"};
  overflow: ${props => props.ellipsis && "hidden"};
  white-space: ${props => props.ellipsis && "nowrap"};
  max-width: ${props => props.ellipsis && 0};
  text-align: ${props => props.centered && "center"};
`;
