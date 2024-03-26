import React from "react";
import styled from "styled-components";
import { darkGreen, white, disabledGrey } from "@colors";
import { ifStyle } from "@utils";
import { func, bool, string } from "prop-types";

const isDisabled = ifStyle("disabled");

const CheckboxContainer = styled.div`
  & {
    display: block;
    position: relative;
    padding: 0;
    margin: 0;
    cursor: ${isDisabled("not-allowed", "pointer")};
    font-size: 22px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    height: 18px;
    width: 18px;
  }

  /* Hide the browser's default checkbox */
  & input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 18px;
    width: 18px;
    background-color: ${white};
    border-radius: 4px;
    border: 2px solid #ebebeb;
    box-sizing: border-box;
  }

  /* When the checkbox is checked, add a blue background */
  & input:checked ~ .checkmark {
    border: 2px solid ${darkGreen};
    background-color: ${darkGreen};
  }

  /* When the checkbox is checked, add a blue background */
  & input:disabled ~ .checkmark {
    border: 2px solid ${disabledGrey};
    background-color: ${disabledGrey};
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  & input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  & .checkmark:after {
    left: 4px;
    top: 1px;
    width: 4px;
    height: 8px;
    border: solid white;
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

const Checkbox = ({ onClick, checked, id, disabled }) => (
  <CheckboxContainer onClick={onClick} id={id} disabled={disabled}>
    <input type="checkbox" defaultChecked={checked} disabled={disabled} />
    <span className="checkmark" />
  </CheckboxContainer>
);

Checkbox.propTypes = {
  onClick: func.isRequired,
  checked: bool.isRequired,
  id: string.isRequired,
  disabled: bool.isRequired,
};

export default Checkbox;
