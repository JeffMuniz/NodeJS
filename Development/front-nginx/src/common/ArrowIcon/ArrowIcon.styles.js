import styled from "styled-components";
import Icon from "src/common/Icon/Icon";
import { blue } from "src/styles/colors";

export const Arrow = styled(Icon)`
  margin-left: 10px;
  transform: ${props =>
    props.isup === "true" ? "rotate(180deg)" : "rotate(0deg)"};
  transition: transform 300ms ease-in;
  & > path {
    fill: ${props => (props.color ? props.color : blue)};
  }
`;
