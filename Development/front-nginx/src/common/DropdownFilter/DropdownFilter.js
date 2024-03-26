import React, { Component } from "react";
import { arrayOf, shape, string, func, oneOfType, number } from "prop-types";

import { ClickOutsideListener } from "@common";

import { blue } from "@colors";

import {
  Container,
  Icon,
  SelectIcon,
  SelectWrap,
  SelectOptions,
  SelectedOptionDescription,
  StyledOption,
  Text,
} from "./DropdownFilter.styles";

class DropdownFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showOptions: false,
      filterBy: Array.isArray(props.options) ? props.options[0] : {},
    };

    this.triggerRef = React.createRef();
  }

  handleOptionsVisibilityChanges = () => {
    const { showOptions } = this.state;
    this.setState({ showOptions: !showOptions });
  };

  handleOnChange = option => {
    const { showOptions } = this.state;
    const { callback } = this.props;

    this.setState({
      showOptions: !showOptions,
      filterBy: option,
    });

    callback(option);
  };

  render() {
    const { id, options } = this.props;

    const { showOptions, filterBy } = this.state;

    return (
      <Container>
        <SelectWrap id={`${id}_select`} innerRef={this.triggerRef}>
          <Text>Mostrar: </Text>
          <SelectIcon
            id="generic_dropdown_filter_btn"
            onClick={this.handleOptionsVisibilityChanges}
          >
            <SelectedOptionDescription>
              {filterBy.description}
            </SelectedOptionDescription>
            <Icon name="arrowDown" fill={blue} />
          </SelectIcon>
        </SelectWrap>

        <ClickOutsideListener
          id="outside_listener_generic_dropdown"
          handleClickOutside={this.handleOptionsVisibilityChanges}
          isListening={showOptions}
          triggerRef={this.triggerRef}
        >
          {showOptions && (
            <SelectOptions>
              {options.map(option => (
                <StyledOption
                  active={option.key === filterBy.key}
                  key={option.key}
                  id={`custom-select-option-${option.key}`}
                  onClick={() => this.handleOnChange(option)}
                >
                  {option.description}
                </StyledOption>
              ))}
            </SelectOptions>
          )}
        </ClickOutsideListener>
      </Container>
    );
  }
}

DropdownFilter.propTypes = {
  id: string.isRequired,
  options: arrayOf(
    shape({
      value: oneOfType([string, number]),
      description: string,
    }),
  ).isRequired,
  callback: func.isRequired,
};

export default DropdownFilter;
