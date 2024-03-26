import styled from "styled-components";
import { lighterBlack } from "@colors";

export const FieldLabelWrapper = styled.div`
  width: ${props => props.width};
  min-width: ${props => props.minWidth};
  padding-right: 10px;
`;

export const Label = styled.div`
  line-height: 22px;
  font-size: 12px;
  color: ${lighterBlack};
`;

export const Value = styled.div`
  line-height: 26px;
  font-size: 16px;
  color: ${lighterBlack};
  font-weight: bold;
`;
