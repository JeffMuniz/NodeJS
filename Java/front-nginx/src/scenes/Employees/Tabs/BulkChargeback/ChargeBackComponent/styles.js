import React from "react";
import styled from "styled-components";

import { white, blue, red, inputBorder, lighterBlack } from "@colors";
import { ifStyle } from "@utils";
import { SvgIcon, Button as BaseButton } from "@common";

const isActive = ifStyle("active");

export const Icon = styled(props => <SvgIcon {...props} />)`
  position: absolute;
  left: 0;
  margin: 7px;
`;

export const CustomInputWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  width: 100%;
  margin-top: 0px;
`;

export const SelectWrap = styled.span`
  flex-direction: row;
  display: flex;
  top: 8px;
  right: 0;
  text-align: center;
  color: ${blue};
  min-width: 260px;
  white-space: nowrap;
`;

export const SelectOptions = styled.ul`
  position: absolute;
  top: 5px;
  right: -65px;
  width: 200px;
  padding: 0;
  background: ${white};
  box-shadow: 1px 4px 20px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  z-index: 5;
`;

export const SelectIcon = styled.div`
  cursor: pointer;
`;

export const StyledOption = styled.li`
  list-style: none;
  display: block;
  text-align: left;
  padding: 23px 0;
  border-bottom: 1px solid ${inputBorder};
  margin: 0 25px;
  cursor: pointer;
  font-weight: ${isActive("bold", "normal")};
  color: ${lighterBlack};
  &:last-child {
    border-bottom: none;
  }
`;

export const Text = styled.span`
  color: ${lighterBlack};
`;

export const Wrapper = styled.div`
  padding: 20px;
  width: 620px;
`;

export const ButtonsWrapper = styled.div`
  margin: 20px auto;
  display: flex;
  justify-content: center;
  max-width: 400px;
`;

export const FilterWrapper = styled.div`
  display: flex;
`;

export const ActionButtonsWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const Button = styled(BaseButton)`
  color: ${red};
`;
