import styled from "styled-components";

import { blue } from "src/styles/colors";

export const Touchable = styled.button`
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
