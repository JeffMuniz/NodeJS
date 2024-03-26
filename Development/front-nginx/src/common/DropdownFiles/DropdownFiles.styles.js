import styled from "styled-components";
import { inputBorder, shark, white, disabledDarkGrey } from "@colors";
import { ifStyle } from "@utils";

const isActive = ifStyle("active");

export const DropdownExportContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const SelectOptions = styled.ul`
  position: absolute;
  width: 150px;
  padding: 0px 30px;
  background: ${white};
  box-shadow: 1px 4px 20px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  z-index: 5;
`;

export const StyledOption = styled.div`
  border-bottom: 1px solid ${inputBorder};
  display: flex;
  align-items: center;
  height: 42px;
  color: ${props => (props.enabled ? shark : disabledDarkGrey)};
  cursor: ${props => (props.enabled ? "pointer" : "not-allowed")};
  font-size: 14px;
  text-align: left;
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
  padding: 10px 0px;
`;

export const QuestionMarkIcon = styled.div`
  display: flex;
  align-items: center;
  margin-left: 5px;
`;

export const DocumentTypeDescription = styled.div`
  display: flex;
  align-items: center;
`;
