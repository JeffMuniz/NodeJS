import React from "react";
import { string, shape, arrayOf, bool, func } from "prop-types";

import { blue } from "@colors";
import {
  CustomInputWrap,
  SelectWrap,
  SelectOptions,
  StyledOption,
  Icon,
  SelectIcon,
  Text,
} from "./styles";

const CustomInput = ({
  filterBy,
  showInputOptions,
  fieldsToFilterBy,
  handleClick,
  handleFilterByChanges,
  text,
  aria,
  id,
}) => (
  <CustomInputWrap>
    <SelectWrap data-customselect={aria} id={id}>
      <Text>{text}</Text>
      {filterBy.description}
      <SelectIcon
        data-customselect={`${aria}_btn`}
        id={`${id}_btn`}
        onClick={handleClick}
      >
        <Icon name="arrowDown" fill={blue} />
      </SelectIcon>
    </SelectWrap>
    {showInputOptions && (
      <SelectOptions>
        {fieldsToFilterBy.map(option => (
          <StyledOption
            active={option.key === filterBy.key}
            key={option.key}
            id={`custom-select-option-${option.key}`}
            onClick={() => handleFilterByChanges(option)}
            style={option.styled}
          >
            {option.optionDescription || option.description}
          </StyledOption>
        ))}
      </SelectOptions>
    )}
  </CustomInputWrap>
);

CustomInput.propTypes = {
  fieldsToFilterBy: arrayOf(
    shape({
      key: string.isRequired,
      description: string.isRequired,
      optionDescription: string,
    }),
  ).isRequired,
  filterBy: shape({}),
  showInputOptions: bool.isRequired,
  handleClick: func.isRequired,
  handleFilterByChanges: func.isRequired,
  text: string.isRequired,
  aria: string.isRequired,
  id: string.isRequired,
};

CustomInput.defaultProps = {
  filterBy: {},
};

export default CustomInput;
