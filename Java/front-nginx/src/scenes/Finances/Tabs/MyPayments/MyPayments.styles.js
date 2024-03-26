import styled from "styled-components";
import { blue, lighterBlack, rgbaMediumGrey } from "@colors";

export const Container = styled.div`
  padding-bottom: ${props => (props.itens !== 0 ? "30px" : "0")};
`;

export const ContainerFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 10px 20px;
`;

export const ContentFlexButton = styled.div`
  display: flex;
  align-items: center;
  width: 115px;
`;

export const InvoiceContainer = styled.div`
  background-color: ${rgbaMediumGrey};
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 8px;
  padding: 16px 25px;
`;

export const ItemTitle = styled.div`
  line-height: 22px;
  font-size: 12px;
  color: ${lighterBlack};
`;

export const ItemValue = styled.div`
  line-height: 26px;
  font-size: 16px;
  color: ${lighterBlack};
  font-weight: bold;
`;

export const ItemLink = styled.div`
  font-size: 14px;
  color: ${blue};
  cursor: pointer;
  display: flex;
  line-height: 19px;
  font-weight: 600;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  height: 100%;
  width: 100%;
`;

export const SelectWrapper = styled.div`
  display: flex;
`;

export const PeriodLabel = styled.div`
  display: inline-block;
  margin-right: 5px;
`;

export const ItemWrapper = styled.div`
  width: ${props => props.width};
  min-width: ${props => props.minWidth};
  padding-right: 10px;
`;

export const Div = styled.div``;

export const Table = styled.div`
  display: table;
  border-collapse: separate;
  border-spacing: 0 12px;
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
  /* border-left: 1px solid #9b9b9b4c; */
  /* padding-left: 34px; */
`;
