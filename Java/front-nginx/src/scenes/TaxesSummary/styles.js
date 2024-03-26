import styled from "styled-components";
import { ligtherGrey } from "@colors";

export const TaxLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 35px;
  border-top: ${props => props.withBorder && `1px solid ${ligtherGrey}`};
  border-bottom: ${props => props.withBorder && `1px solid ${ligtherGrey}`};
`;

export const TaxLabel = styled.div`
  font-size: ${props => props.isBigger && "1.2em"};
  font-weight: ${props => props.isBold && "bold"};
`;

export const TaxValue = styled.div`
  font-size: ${props => props.isBigger && "1.2em"};
  font-weight: ${props => props.isBold && "bold"};
`;

export const TaxContainer = styled.div`
  height: ${props => props.loading && !props.hasError && "270px"};
`;

export const TaxItem = styled.div`
  margin-top: ${props => (props.withSpacing ? "30px" : "10px")};
  margin-bottom: 10px;
`;
