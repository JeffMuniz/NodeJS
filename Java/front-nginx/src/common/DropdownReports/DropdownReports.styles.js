import styled from "styled-components";
import { inputBorder, shark, white } from "@colors";
import { ifStyle } from "@utils";

const isActive = ifStyle("active");

export const DropdownExportContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const SelectOptions = styled.ul`
  position: absolute;
  width: 200px;
  padding: 0;
  background: ${white};
  box-shadow: 1px 4px 20px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  z-index: 5;
`;

export const StyledOption = styled.li`
  border-bottom: 1px solid ${inputBorder};
  display: block;
  color: ${shark};
  font-size: 14px;
  line-height: 19px;
  list-style: none;
  margin: 0 30px;
  padding: 12px 0;
  text-align: left;
  cursor: pointer;
  font-weight: ${isActive("bold", "600")};
  &:last-child {
    border-bottom: none;
  }
`;

export const Title = styled.div`
  border-bottom: 1px solid ${inputBorder};
  color: ${shark};
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  margin: 10px 25px 0;
  padding-bottom: 10px;
`;
