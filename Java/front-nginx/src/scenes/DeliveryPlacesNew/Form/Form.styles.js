import styled from "styled-components";
import { Row } from "react-styled-flexboxgrid";

import { red } from "@colors";

export const RowContent = styled(Row)`
  flex-direction: column;
  min-height: 250px;
`;

export const RowFooter = styled(Row)`
  margin-bottom: 116px;
`;

export const LabelUpload = styled.label`
  font-weight: 700;
  line-height: normal;
  font-size: 14px;
  letter-spacing: -0.3px;
  text-transform: uppercase;
  color: ${red};
  display: inline-flex;
  margin: 0;
  border: none;
  cursor: pointer;
  background: transparent;
`;

export const InputFile = styled.input`
  display: none;
`;
