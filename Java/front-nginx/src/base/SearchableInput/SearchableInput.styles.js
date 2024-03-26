import React from "react";
import styled from "styled-components";

import { white, blue, inputBorder } from "@colors";
// TODO: check why @common with TextInput does not work
import { ifStyle } from "@utils";
import { SvgIcon, TextInput } from "@common";

const isActive = ifStyle("active");

export const IconWrapper = styled.div`
  position: relative;
  left: 40px;
  margin: 7px;
`;

export const Icon = styled(props => <SvgIcon {...props} />)`
  position: absolute;
  left: 0;
  margin: 7px;
`;

export const CustomInputWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  position: ${props => props.position || "relative"};
  margin-right: ${props => props.marginRight};
`;

export const Input = styled(props => <TextInput {...props} />)`
  width: 320px;
  &:focus {
    outline: none;
    ::placeholder {
      color: transparent;
    }
  }
`;

export const SelectWrap = styled.span`
  flex-direction: row;
  display: flex;
  position: absolute;
  top: 8px;
  right: 0;
  text-align: center;
  cursor: ${props => props.cursorPointer && "pointer"};
  color: ${blue};
`;

export const SelectOptions = styled.ul`
  position: absolute;
  top: 25px;
  right: 0;
  width: 200px;
  padding: 0;
  background: ${white};
  box-shadow: 1px 4px 20px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  z-index: 5;
`;

export const SelectIcon = styled.div``;

export const StyledOption = styled.li`
  list-style: none;
  display: block;
  text-align: left;
  padding: 23px 0;
  border-bottom: 1px solid ${inputBorder};
  margin: 0 30px;
  cursor: pointer;
  font-weight: ${isActive("bold", "normal")};
  &:last-child {
    border-bottom: none;
  }
`;
