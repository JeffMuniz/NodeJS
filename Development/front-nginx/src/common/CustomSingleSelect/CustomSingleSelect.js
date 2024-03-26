import React, { Component } from "react";
import {
  func,
  bool,
  string,
  number,
  arrayOf,
  shape,
  oneOfType,
} from "prop-types";
import isEqual from "lodash/isEqual";

import {
  Container,
  Option,
  Description,
  SearchIcon,
  Button,
  Input,
  OptionsWrapper,
} from "../CustomSelect/CustomSelect.styles";

class CustomSingleSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: props.selectedItem || {},
      availableOptions: props.options,
      inputValue: "",
    };
  }

  componentDidUpdate(prevProps) {
    const { options } = this.props;
    const { options: prevOptions } = prevProps;
    if (!isEqual(prevOptions, options)) {
      this.reloadAvailableOptions(options);
    }
  }

  reloadAvailableOptions = availableOptions =>
    this.setState({
      availableOptions,
      selectedItem: null,
    });

  handleOptionClick = chosenItem => () => {
    this.setState({ selectedItem: chosenItem });
  };

  handleInfiniteScroll = ({
    target: { scrollHeight, scrollTop, clientHeight },
  }) => {
    const { hasInfiniteScroll, onScrollBottom } = this.props;
    if (!hasInfiniteScroll) {
      return;
    }

    if (scrollHeight - scrollTop === clientHeight) {
      onScrollBottom();
    }
  };

  filterOptions = ({ target: { value: inputValue } }) => {
    const { options, onFilterOptions } = this.props;
    const searchTerm = inputValue.toLowerCase();
    if (!inputValue) {
      this.setState({
        availableOptions: options,
        inputValue,
      });
      return;
    }
    const availableOptions = options.filter(
      op => op.description.toLowerCase().indexOf(searchTerm) >= 0,
    );

    this.setState({ availableOptions, inputValue });

    onFilterOptions(searchTerm, availableOptions);
  };

  applySelection = () => {
    const { onSelect } = this.props;
    const { selectedItem } = this.state;
    onSelect(selectedItem);
  };

  render() {
    const { selectedItem, availableOptions, inputValue } = this.state;
    const { showSelect, inputPlaceHolder, id, maskType } = this.props;

    return (
      <Container showSelect={showSelect}>
        <Input
          placeholder={inputPlaceHolder}
          onChange={this.filterOptions}
          value={inputValue}
          hasIcon
          maskType={maskType}
          id={id}
        />
        <OptionsWrapper onScroll={this.handleInfiniteScroll}>
          {availableOptions.map((option, index) => (
            <Option
              id={`${id}_option-${index}`}
              key={`option-${option.value}`}
              onClick={this.handleOptionClick(option)}
            >
              <Description>{option.description}</Description>
              <SearchIcon
                selected={selectedItem && selectedItem.value === option.value}
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

CustomSingleSelect.propTypes = {
  options: arrayOf(
    shape({
      value: oneOfType([string, number]).isRequired,
      description: string.isRequired,
    }),
  ),
  onSelect: func,
  onFilterOptions: func,
  onScrollBottom: func,
  showSelect: bool,
  hasInfiniteScroll: bool,
  inputPlaceHolder: string,
  id: string.isRequired,
  selectedItem: shape({
    value: oneOfType([string, number]),
    description: string.isRequired,
  }),
  maskType: string,
};

CustomSingleSelect.defaultProps = {
  options: [],
  onSelect: () => null,
  onFilterOptions: () => null,
  onScrollBottom: () => null,
  showSelect: false,
  hasInfiniteScroll: false,
  inputPlaceHolder: "Buscar",
  selectedItem: {},
  maskType: "text",
};

export default CustomSingleSelect;
