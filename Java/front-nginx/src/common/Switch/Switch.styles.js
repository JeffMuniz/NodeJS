import styled from "styled-components";

import { white, lighterGreen, ligtherGrey } from "src/styles/colors";

const isLabelBefore = (truly, falsy) => ({ labelBefore }) =>
  labelBefore ? truly : falsy;

export const Wrapper = styled.div`
  width: auto;
  display: flex;
  align-items: center;
`;

export const CheckBox = styled.input`
  position: absolute;
  margin-left: -9999px;
  visibility: hidden;
`;

export const FakeLabel = styled.label`
  order: 2;

  ${CheckBox} + & {
    display: block;
    position: relative;
    cursor: pointer;
    outline: none;
    user-select: none;
    width: 32px;
    height: 16px;
    border-radius: 8px;
  }

  ${CheckBox} + &:before,
  ${CheckBox} + &:after {
    content: "";
    top: 0;
    left: 0;
    bottom: 0;
    display: block;
    position: absolute;
  }

  ${CheckBox} + &:before {
    right: 1px;
    background-color: ${ligtherGrey};
    border-radius: 8px;
    transition: all 0.4s;
  }

  ${CheckBox} + &:after {
    width: 16px;
    background-color: ${white};
    border-radius: 100%;
    box-shadow: 0 1px 1px 1px #D5D5D5;
    transition: all 0.4s;
  }

  ${CheckBox}:checked + &:before {
    background-color: ${lighterGreen};
  }
  ${CheckBox}:checked + &:after {
    transform: translateX(100%);
  }
`;

export const Label = styled.label`
  margin-${isLabelBefore("right", "left")}: 15px;
  order: ${isLabelBefore(1, 2)};
	color: #3F4142;
	font-size: 14px;
	font-weight: bold;
	line-height: 19px;
  letter-spacing: -0.3px;
`;
