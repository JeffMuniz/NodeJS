import styled from "styled-components";
import { ifStyle } from "@utils";

import {
  inputBorder,
  inputPlaceholder,
  shark,
  darkGrey,
  veryLightBlack,
  red,
} from "@colors";

const hasError = ifStyle("hasError");

export const FieldWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
  width: ${({ width }) => width || "271px"};

  // Only the first input found to avoid breaking third-party libraries like react-select
  & > input,
  textarea {
    height: 40px;

    box-sizing: border-box;
    border-radius: 8px;

    padding: 10px 16px;

    font-size: 14px;
    line-height: 19px;

    color: ${shark};

    outline: none;

    background: transparent;

    &::placeholder {
      color: ${inputPlaceholder};
    }

    &:disabled {
      background: ${darkGrey};
      border: 1px solid ${inputBorder};
      cursor: not-allowed;
    }
  }

  .Select-control, // React-Select
  input,
  textarea {
    border: 1px solid ${hasError(red, inputBorder)};
  }

  svg {
    display: flex;
    margin-left: 150px;
    margin-top: -30px;
    padding-bottom: 8px;
    height: 21px;
  }
`;

export const Label = styled.span`
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: -0.3px;
  color: ${veryLightBlack};
  display: block;
  margin-bottom: 11px;
`;

export const ErrorMessage = styled.div`
  position: absolute;
  left: 0;
  bottom: -18px;
  color: ${red};

  font-style: italic;
  font-weight: normal;
  font-size: 12px;
`;
