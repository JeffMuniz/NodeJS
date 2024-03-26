import styled from "styled-components";
import Select from "react-select";

import { lighterBlack, darkGrey, white } from "@colors";

export const StyledSelect = styled(Select)`
  &&& {
    .Select-control {
      height: 40px;
    }

    .Select-placeholder,
    .Select-value {
      display: flex;
      align-items: center;
      padding: 10px 16px;
      font-size: 14px;
      line-height: 19px;
    }

    .Select-menu-outer {
      box-shadow: 1px 4px 20px rgba(0, 0, 0, 0.2);
      border: none;
    }

    .Select-option {
      font-size: 16px;
      line-height: 26px;
      letter-spacing: 0.1px;
      color: ${lighterBlack};
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      padding: 14px 28.64px;
      background: ${white};
      position: relative;

      * {
        background: transparent;
      }

      &::after {
        content: "";
        height: 1px;
        position: absolute;
        bottom: 0;
        left: 28.64px;
        right: 28.64px;
        background: ${darkGrey};
      }

      &:last-of-type {
        border: none;

        &::after {
          height: 0px;
        }
      }

      &.is-selected,
      &.is-focused {
        background-color: ${white};
      }
    }
  }
`;
