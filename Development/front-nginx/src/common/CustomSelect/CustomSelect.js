import React, { Component } from "react";
import {
  string,
  shape,
  arrayOf,
  func,
  bool,
  oneOfType,
  number,
} from "prop-types";
import { SvgIcon } from "@common";

import isEqual from "lodash/isEqual";
import {
  Container,
  Option,
  Description,
  Button,
  Input,
  OptionsWrapper,
  SearchIcon,
  IconWrapper,
} from "./CustomSelect.styles";

const ALL_OPTIONS_VALUE = "all";

class CustomSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItems: [],
      availableOptions: [
        { value: ALL_OPTIONS_VALUE, description: "Todas" },
        ...props.options,
      ],
      inputValue: "",
    };
  }

  componentDidUpdate(prevProps) {
    const { options } = this.props;
    if (!isEqual(prevProps.options, options)) {
      this.reloadAvailableOptions(options);
    }
  }

  reloadAvailableOptions = newOptions =>
    this.setState({
      availableOptions: [
        { value: ALL_OPTIONS_VALUE, description: "Todas" },
        ...newOptions,
      ],
      selectedItems: [],
    });

  handleOptionClick = chosenItem => () => {
    const { selectedItems } = this.state;
    const { options } = this.props;
    let modifiedItems = [];

    if (chosenItem === ALL_OPTIONS_VALUE) {
      modifiedItems = selectedItems.some(item => item === chosenItem)
        ? []
        : [ALL_OPTIONS_VALUE, ...options.map(prop => prop.value)];

      this.setState({ selectedItems: modifiedItems });
      return;
    }

    modifiedItems = selectedItems.some(item => item === chosenItem)
      ? selectedItems.filter(item => item !== chosenItem)
      : [...selectedItems, chosenItem];

    if (
      modifiedItems.length < options.length ||
      (modifiedItems.length === options.length &&
        modifiedItems.some(item => item === ALL_OPTIONS_VALUE))
    ) {
      modifiedItems = modifiedItems.filter(item => item !== ALL_OPTIONS_VALUE);
    } else {
      modifiedItems = [...modifiedItems, ALL_OPTIONS_VALUE];
    }

    this.setState({ selectedItems: modifiedItems });
  };

  filterOptions = event => {
    const inputValue = event.target.value;
    const { options } = this.props;
    if (!inputValue) {
      this.setState({
        availableOptions: [
          { value: ALL_OPTIONS_VALUE, description: "Todas" },
          ...options,
        ],
        inputValue,
      });
      return;
    }
    const availableOptions = options.filter(
      op =>
        op.description
          .toLowerCase()
          .indexOf(event.target.value.toLowerCase()) >= 0,
    );

    this.setState({ availableOptions, inputValue });
  };

  applySelection = () => {
    const { selectedItems } = this.state;
    const { onSelect } = this.props;
    const selected = selectedItems.filter(value => value !== ALL_OPTIONS_VALUE);
    onSelect(selected);
  };

  render() {
    const { selectedItems, availableOptions, inputValue } = this.state;
    const { showSelect, inputPlaceHolder, id, maskType } = this.props;

    return (
      <Container showSelect={showSelect}>
        <IconWrapper>
          <SearchIcon name="search" />
        </IconWrapper>
        <Input
          id={`input-${id}`}
          placeholder={inputPlaceHolder}
          onChange={this.filterOptions}
          value={inputValue}
          hasIcon
          maskType={maskType}
        />
        <OptionsWrapper>
          {availableOptions.map((option, index) => (
            <Option
              id={`${id}_option-${index}`}
              key={`option-${option.value}`}
              onClick={this.handleOptionClick(option.value)}
            >
              <Description>{option.description}</Description>
              <SvgIcon
                name={
                  selectedItems.some(item => item === option.value)
                    ? "checkedBox"
                    : "uncheckedBox"
                }
              />
            </Option>
          ))}
        </OptionsWrapper>
        <Button id={`${id}_btn_apply_filter`} onClick={this.applySelection}>
          aplicar
        </Button>
      </Container>
    );
  }
}

CustomSelect.propTypes = {
  options: arrayOf(
    shape({
      value: oneOfType([string, number]).isRequired,
      description: string.isRequired,
    }),
  ).isRequired,
  onSelect: func.isRequired,
  showSelect: bool,
  inputPlaceHolder: string,
  id: string.isRequired,
  maskType: string,
};

CustomSelect.defaultProps = {
  showSelect: false,
  inputPlaceHolder: "Buscar",
  maskType: "text",
};

export default CustomSelect;
