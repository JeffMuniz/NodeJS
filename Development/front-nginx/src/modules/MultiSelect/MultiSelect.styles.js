import ReactSelect from "react-select";
import styled from "styled-components";
import { red, darkGrey, white } from "src/styles/colors";

export const Select = styled(ReactSelect)`
  & .Select-control {
    background-color: ${white};
    border-radius: 8px;
    border: ${props =>
      props.hasError ? `1px solid ${red}` : `1px solid ${darkGrey}`};
    border-spacing: 0;
    border-collapse: separate;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    color: #3c3b3b;
    display: table;
    font-weight: 100;
    font-size: 14px;
    height: 40px;
    outline: none;
    overflow: auto;
    z-index: 9999;
  }
  &.is-disabled.Select > .Select-control {
    background-color: rgba(248, 248, 248, 0.5);
  }
  & .Select-placeholder {
    line-height: 40px;
  }
  &.Select--single > .Select-control .Select-value {
    line-height: 40px;
  }

  & .Select-control > .Select-multi-value-wrapper {
    max-height: 50px;
  }

  & .Select-menu {
    max-height: ${props =>
      props.maxMenuHeight ? props.maxMenuHeight : "198px"};
  }
`;
