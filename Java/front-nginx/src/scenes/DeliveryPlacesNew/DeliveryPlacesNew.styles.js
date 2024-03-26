import styled from "styled-components";
import { Row } from "react-styled-flexboxgrid";

import { blue } from "@colors";

export const RowStyled = styled(Row)`
  margin-top: 30px;
`;

export const ButtonLink = styled.button`
  padding: 0;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${blue};
  cursor: pointer;
  color: ${blue};
  font-weight: 700;
  font-size: 16px;
  outline: none;
  margin-left: 4px;
`;
