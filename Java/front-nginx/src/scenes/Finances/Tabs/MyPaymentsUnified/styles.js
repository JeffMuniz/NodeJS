import styled from "styled-components";
import { rgbaMediumGrey, lighterBlack } from "@colors";

export const Table = styled.div`
  display: table;
  border-collapse: separate;
  border-spacing: 0 6px;
  width: 100%;
`;

export const InvoiceRow = styled.div`
  background-color: ${rgbaMediumGrey};
  display: table-row;
  margin-bottom: 8px;
  padding: 16px 25px;
`;

export const Field = styled.div`
  gap: 6px;
  align-items: center;
  display: ${props => props.isFlex && "-webkit-box"};
`;

export const Label = styled.div`
  line-height: 22px;
  font-size: 12px;
  color: ${lighterBlack};
`;

export const Value = styled.div`
  line-height: 26px;
  font-size: 14px;
  color: ${lighterBlack};
  font-weight: bold;
`;

export const FiltersWrapper = styled.div`
  display: flex;
  margin: 0 10px 20px;
`;

export const Cell = styled.div`
  display: table-cell;
  padding: 12px 18px;
  vertical-align: middle;
  border-top-left-radius: ${props => props.withRadiusLeft && "10px"};
  border-bottom-left-radius: ${props => props.withRadiusLeft && "10px"};
  border-top-right-radius: ${props => props.withRadiusRight && "10px"};
  border-bottom-right-radius: ${props => props.withRadiusRight && "10px"};
`;

export const CellWithBorder = styled.div`
  border-right: 1px solid #9b9b9b4c;
  border-left: 1px solid #9b9b9b4c;
  padding-left: 34px;
`;
