import React, { Component } from "react";
import { arrayOf, shape, string, func, oneOfType, number } from "prop-types";
import {
  Container,
  OptionsWrapper,
  Option,
  Input,
  IconWrapper,
  Icon,
} from "./Dropdown.styles";

class Dropdown extends Component {
  state = {
    inputValue: "",
  };

  handleOnChange = event => {
    const {
      target: { value: inputValue },
    } = event;

    this.setState({ inputValue }, () => {
      const { onFilterOptions } = this.props;

      onFilterOptions(inputValue);
    });
  };

  render() {
    const {
      onSelect,
      inputPlaceHolder,
      options,
      onScroll,
      maskType,
    } = this.props;

    const { inputValue } = this.state;
    const { id } = this.props;

    return (
      <Container>
        <IconWrapper>
          <Icon name="search" />
        </IconWrapper>
        <Input
          id={id}
          hasIcon
          value={inputValue}
          placeholder={inputPlaceHolder}
          maskType={maskType}
          onChange={this.handleOnChange}
        />
        <OptionsWrapper onScroll={onScroll}>
          {options.map((op, index) => (
            <Option
              key={`${id}_op_${index}`}
              id={`${id}_op_${index}`}
              onClick={onSelect(op)}
            >
              {op.description}
            </Option>
          ))}
        </OptionsWrapper>
      </Container>
    );
  }
}

Dropdown.propTypes = {
  options: arrayOf(
    shape({
      value: oneOfType([string, number]),
      description: string,
    }),
  ).isRequired,
  onSelect: func.isRequired,
  inputPlaceHolder: string,
  onFilterOptions: func,
  onScroll: func,
  maskType: string,
  id: string,
};

Dropdown.defaultProps = {
  inputPlaceHolder: "",
  onFilterOptions: undefined,
  onScroll: () => null,
  maskType: "text",
  id: "searchable_dropdown",
};

export default Dropdown;
