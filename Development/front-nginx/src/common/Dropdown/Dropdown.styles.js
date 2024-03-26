import React from "react";
import styled from "styled-components";

import { SvgIcon } from "@common";

import { ifStyle } from "@utils";

import {
  black,
  blue,
  inputBorder,
  lighterBlack,
  white,
} from "src/styles/colors";

const isActive = ifStyle("active");

export const Container = styled.div`
  width: ${props => props.containerWidth || "200px"};
`;

export const Icon = styled(props => <SvgIcon {...props} />)`
  position: absolute;
  left: 0;
  margin: 7px;
`;

export const SelectIcon = styled.div`
  cursor: pointer;
  display: flex;
`;

export const SelectWrap = styled.div`
  color: ${blue};
  display: flex;
  position: absolute;
`;

export const SelectOptions = styled.ul`
  position: absolute;
  background: ${white};
  box-shadow: 1px 4px 20px rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin-top: 25px;
  padding: 0;
  width: ${props => props.optionsWidth || "200px"};
  z-index: 5;
`;

export const SelectedOptionDescription = styled.span`
  position: relative;
  font-weight: 600;
`;

export const StyledOption = styled.li`
  cursor: pointer;
  border-bottom: 1px solid ${inputBorder};
  color: ${lighterBlack};
  display: block;
  font-weight: ${isActive("bold", "normal")};
  list-style: none;
  text-align: left;
  padding: 20px 0;
  margin: 0 25px;

  &:last-child {
    border-bottom: none;
  }
`;

export const Text = styled.span`
  color: ${black};
  font-size: 16px;
  margin-right: 5px;
`;
