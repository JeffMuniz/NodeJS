import styled from "styled-components";

import { Col } from "react-styled-flexboxgrid";

import { ifStyle } from "@utils";

import {
  darkGrey,
  wildWatermelon,
  mineShaft,
  white,
  seashell,
  darkWhite,
  ligthGrey,
  veryLigtherGrey,
} from "@colors";

const hasErrors = ifStyle("error");
const isDisabled = ifStyle("disabled");

export const InputWrapper = styled(Col)`
  .react-autosuggest__container {
    position: relative;
  }

  .react-autosuggest__input {
    box-shadow: inset 0.5px 0.5px 0.5px 0
      ${hasErrors("rgba(255, 91, 104, 0.3)", "rgba(0, 0, 0, 0.3)")};
    border-radius: 8px;
    border: 1px solid
      ${hasErrors(wildWatermelon, isDisabled(ligthGrey, darkGrey))};
    border-spacing: 0;
    border-collapse: separate;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    color: ${mineShaft};
    cursor: default;
    display: table;
    font-weight: 100;
    font-size: 14px;
    height: 40px;
    margin-top: 10px;
    outline: none;
    overflow: hidden;
    padding: 0 15px;
    width: 365px;
  }

  .react-autosuggest__input::placeholder {
    color: ${isDisabled(veryLigtherGrey, mineShaft)};
  }

  .react-autosuggest__input--focused {
    outline: none;
  }

  .react-autosuggest__suggestions-container {
    display: none;
  }

  .react-autosuggest__suggestions-container--open {
    display: block;
    position: absolute;
    top: 44px;
    width: 280px;
    border: 1px solid ${darkGrey};
    background-color: ${white};
    font-family: Helvetica, sans-serif;
    font-weight: 300;
    font-size: 16px;
    border-radius: 2px;
    max-height: 203px;
    overflow-y: auto;
    z-index: 2;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }

  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
  }

  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 8px 16px;
    border-bottom: 1px solid ${seashell};

    &:last-child {
      border-bottom: none;
    }
  }

  .react-autosuggest__suggestion--highlighted {
    background-color: ${darkWhite};
  }
`;

export const ErrorMessage = styled.span`
  color: ${wildWatermelon};
  line-height: 18px;
  font-size: 12px;
  letter-spacing: 0.1px;
  margin: 5px;
`;

export const IconWrapper = styled.div`
  position: relative;
  top: -30px;
  left: 320px;
  margin: 0 7px;
  justify-content: center;
  align-items: center;
`;
