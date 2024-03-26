import styledWeb, { injectGlobal } from "styled-components";
import { white, blue, lightBlue, disabledGrey } from "@colors";

export const WebInput = styledWeb.input`
  background-color: ${props => (props.disabled ? "#d9d9d9" : "#fff")};
  border-color: #d9d9d9 #ccc #b3b3b3;
  border: 1px solid #ccc;
  cursor: default;
    border-radius: 8px;
    border: 1px solid #BEBEBE;
    border-spacing: 0;
    border-collapse: separate;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    color: #333333;
    cursor: default;
    display: table;
    font-weight: 100;
    font-size: 14px;
    height: 40px;
    outline: none;
    overflow: hidden;
    padding: 0 25px 0 15px;
    width: 100%;
`;

export const Wrapper = styledWeb.div`
  width: 100%;
`;

export const WebInputError = styledWeb.span`
  color: red;
  font-size: 16px;
`;

/* eslint-disable */
injectGlobal`
  .DayPicker__withBorder {
    box-shadow: none !important;
  }

  .CalendarDay__default {
    color: ${blue} !important;
    font-weight: 100 !important;
  }

  .CalendarDay__selected_span {
    background: ${lightBlue} !important;
    color: ${white} !important;
    border: 1px solid ${disabledGrey} !important;
  }

  .CalendarDay__hovered_span {
    border: 1px solid ${disabledGrey} !important;
  }

  .CalendarDay__selected {
    background: ${blue} !important;
    color: ${white} !important;
  }

  .CalendarDay__selected:hover {
    background: ${blue} !important;
    color: ${white} !important;
  }

  .CalendarDay__hovered_span:hover,
  .CalendarDay__hovered_span {
    background: ${lightBlue} !important;
    color: ${white} !important;
  }

  .CalendarDay__blocked_out_of_range,
  .CalendarDay__blocked_out_of_range:active,
  .CalendarDay__blocked_out_of_range:hover {
    color: ${disabledGrey} !important;
  }
`;
