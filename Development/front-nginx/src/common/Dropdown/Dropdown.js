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
} from "./Dropdown.styles";

class Dropdown extends Component {
  constructor(props) {
    super(props);

    const { defaultFilter, options } = props;

    const filterBy =
      defaultFilter || (Array.isArray(options) ? options[0] : {});

    this.state = {
      showOptions: false,
      filterBy,
    };

    this.triggerRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { defaultFilter } = this.props;
    const { defaultFilter: prevDefaultFilter } = prevProps;

    if (defaultFilter !== prevDefaultFilter) {
      this.handleDefaultFilterChange(defaultFilter);
    }
  }

  handleDefaultFilterChange = defaultFilter =>
    this.setState({ filterBy: defaultFilter });

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
    const { id, options, containerWidth, optionsWidth } = this.props;

    const { showOptions, filterBy } = this.state;

    return (
      <Container containerWidth={containerWidth}>
        <SelectWrap id={`${id}_select`} innerRef={this.triggerRef}>
          <Text>Status: </Text>
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
            <SelectOptions optionsWidth={optionsWidth}>
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

Dropdown.propTypes = {
  id: string.isRequired,
  options: arrayOf(
    shape({
      value: oneOfType([string, number]),
      description: string,
    }),
  ).isRequired,
  callback: func.isRequired,
  containerWidth: string,
  optionsWidth: string,
  defaultFilter: shape({}),
};

Dropdown.defaultProps = {
  containerWidth: "",
  optionsWidth: "",
  defaultFilter: {},
};

export default Dropdown;
