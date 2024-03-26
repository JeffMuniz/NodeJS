import styled from "styled-components";

import { inputBorder, blue, white } from "src/styles/colors";

export const DropdownContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const ActionWrapper = styled.div`
  cursor: pointer;
`;

export const OptionsContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const SelectOptions = styled.ul`
  position: absolute;
  background: ${white};
  box-shadow: 1px 4px 20px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  padding: 0;
  margin-top: 40px;
  width: ${props => props.optionsWidth || "200px"};
  z-index: 5;
`;

export const StyledOption = styled.li`
  cursor: pointer;
  border-bottom: 1px solid ${inputBorder};
  color: ${blue};
  display: block;
  font-weight: 600;
  list-style: none;
  text-align: left;
  padding: 20px 0;
  margin: 0 25px;

  &:last-child {
    border-bottom: none;
  }
`;
