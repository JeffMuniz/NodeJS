import React from "react";
import styled from "styled-components";

import { SvgIcon } from "@common";

import { ifStyle } from "@utils";

import {
  blue,
  inputBorder,
  lighterBlack,
  veryLigtherGrey,
  white,
} from "src/styles/colors";

const isActive = ifStyle("active");

export const Container = styled.div`
  border-color: ${veryLigtherGrey};
  border-radius: 8px;
  border: 1px solid ${inputBorder};
  display: flex;
  position: relative;
  height: 38px;
  width: 183px;
`;

export const Icon = styled(props => <SvgIcon {...props} />)`
  position: absolute;
  left: 0;
  margin: 7px;
`;

export const SelectIcon = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 100%;
`;

export const SelectWrap = styled.div`
  color: ${blue};
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 10px;
  width: 100%;
  position: relative;
`;

export const SelectOptions = styled.ul`
  position: absolute;
  top: 25px;
  left: 85px;
  width: 200px;
  padding: 0;
  background: ${white};
  box-shadow: 1px 4px 20px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  z-index: 5;
`;

export const SelectedOptionDescription = styled.span`
  position: relative;
`;

export const StyledOption = styled.li`
  cursor: pointer;
  border-bottom: 1px solid ${inputBorder};
  color: ${lighterBlack};
  display: block;
  font-weight: ${isActive("bold", "normal")};
  list-style: none;
  text-align: left;
  padding: 23px 0;
  margin: 0 25px;

  &:last-child {
    border-bottom: none;
  }
`;

export const Text = styled.span`
  color: ${inputBorder};
  font-size: 14px;
`;
