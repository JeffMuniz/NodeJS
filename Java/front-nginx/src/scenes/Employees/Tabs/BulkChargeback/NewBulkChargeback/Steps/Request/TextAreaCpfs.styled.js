import styled from "styled-components";
import { inputBorder, inputPlaceholder, red, shark } from "@colors";

export const TextArea = styled.textarea`
  &&& {
    border: 1px solid ${({ hasError }) => (hasError ? red : inputBorder)};
    box-sizing: border-box;
    border-radius: 8px;

    width: 315px;
    height: 216px;
    resize: none;

    overflow-y: auto;

    padding-top: 15px;
    padding-left: 17px;
    font-size: 14px;
    line-height: 19px;

    color: ${shark};

    &::placeholder {
      color: ${inputPlaceholder};
      margin: 17px;

      font-size: 14px;
      line-height: 19px;

      padding-top: 22px;
      padding-left: 16px;
    }
  }
`;
