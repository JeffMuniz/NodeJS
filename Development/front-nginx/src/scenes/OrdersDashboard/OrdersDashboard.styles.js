import styled from "styled-components";

export const Container = styled.div`
  display: block;
`;

export const ContainerFilter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 10px 20px;
`;

export const ContainerDropdownFilter = styled.div`
  display: flex;
`;

export const EmptySearch = styled.span`
  width: 300px;
  display: block;
  margin: auto;
`;

export const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  height: 100%;
  width: 100%;
`;

export const PeriodLabel = styled.div`
  display: inline-block;
  margin-right: 5px;
  width: 200px;
`;

export const SelectWrapper = styled.div`
  display: flex;
`;
