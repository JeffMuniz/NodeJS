import styled from "styled-components";
import { directions } from "@enums";
import { black } from "src/styles/colors";
import BaseIcon from "src/common/Icon/Icon";

const rotations = {
  [directions.up]: "rotate(270deg)",
  [directions.right]: "rotate(0deg)",
  [directions.down]: "rotate(90deg)",
  [directions.left]: "rotate(180deg)",
};

export const Icon = styled(BaseIcon)`
  background-color: transparent;
  & > path {
    fill: ${props => (props.color ? props.color : black)};
  }
  transform: ${props => rotations[props.direction] || "rotate(0deg)"};
`;
