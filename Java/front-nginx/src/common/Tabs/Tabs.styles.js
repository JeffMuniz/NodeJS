import styled from "styled-components";

import { red } from "src/styles/colors";

import { ifStyle } from "@utils";

const isSelected = ifStyle("selected");
const blockOtherTabs = ifStyle("blockOtherTabs");

export const Container = styled.ul`
  height: 40px;
  width: 100%;
  padding: 0;
  margin: ${props => (props.marginLess ? "0 0 30px 0" : "30px 0")};
  list-style: none;
`;

export const TabItem = styled.li`
  display: inline-block;
  padding: 0 20px;
  cursor: pointer;
  height: ${props => (props.height ? props.height : "37px")};
  width: ${props => props.width};
  text-align: center;
  border-bottom: ${isSelected(`4px solid ${red}`, "none")};
  font-weight: ${isSelected("bold", "normal")};
  margin: auto 10px;
  color: ${blockOtherTabs(isSelected("inherit", "grey"), "inherit")};
  &:first-child {
    margin-left: 0;
  }
`;

export const Line = styled.div`
  border: 0.7px solid rgba(155, 155, 155, 0.3);
`;
