import React, { Component } from "react";
import PropTypes from "prop-types";

import MultiSelect from "../../modules/MultiSelect/MultiSelect";
import { Wrapper } from "./Select.styles";

export default class Select extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItem: props.value || null,
    };
  }

  onSelectedItemsChange = theSelectedItem => {
    const { multiSelect, onValueChange } = this.props;
    if (multiSelect) {
      return this.handleMultiSelectChange(theSelectedItem);
    }

    return this.setState({ selectedItem: theSelectedItem }, () => {
      onValueChange(theSelectedItem);
    });
  };

  handleMultiSelectChange = theSelectedItem => {
    const { selectedItem } = this.state;
    if (selectedItem.length > theSelectedItem.length) {
      this.handleRemoveItem(theSelectedItem);
    } else {
      this.handleAddItem(theSelectedItem);
    }
  };

  handleAddItem = items => {
    const { onValueChange, values } = this.props;
    const { selectedItem } = this.state;

    let updatedItems = [];

    if (
      items[items.length - 1].id === 0 ||
      items.length === values.length - 1
    ) {
      updatedItems = values;
    } else {
      updatedItems = items;
    }

    this.setState({ selectedItem: updatedItems }, () => {
      onValueChange(selectedItem);
    });
  };

  handleRemoveItem = items => {
    const { onValueChange } = this.props;
    const { selectedItem } = this.state;

    let updatedItems = [];

    if (
      selectedItem.some(item => item.id === 0) &&
      items.some(item => item.id === 0)
    ) {
      updatedItems = items.filter(item => item.id !== 0);
    } else if (
      selectedItem.some(item => item.id === 0) &&
      !items.some(item => item.id === 0)
    ) {
      updatedItems = [];
    } else {
      updatedItems = items;
    }

    this.setState({ selectedItem: updatedItems }, () => {
      onValueChange(selectedItem);
    });
  };

  render() {
    const {
      isCapitalized,
      id,
      value,
      values,
      multiSelect,
      placeholder,
      onBlur,
      onMenuScrollToBottom,
      isDisabled,
      hasError,
      maxMenuHeight,
      isPassingSelectedItem,
    } = this.props;
    const { selectedItem } = this.state;

    return (
      <Wrapper isCapitalized={isCapitalized}>
        <MultiSelect
          id={id}
          items={values}
          multiSelect={multiSelect}
          selectText={placeholder}
          onChange={this.onSelectedItemsChange}
          onBlur={onBlur}
          onMenuScrollToBottom={onMenuScrollToBottom}
          selectedItem={isPassingSelectedItem ? value : selectedItem}
          disabled={isDisabled}
          hasError={hasError}
          maxMenuHeight={maxMenuHeight}
        />
      </Wrapper>
    );
  }
}

Select.propTypes = {
  id: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onMenuScrollToBottom: PropTypes.func,
  onValueChange: PropTypes.func,
  multiSelect: PropTypes.bool,
  isDisabled: PropTypes.bool,
  hasError: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
    }),
  ]),
  values: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
    }),
  ),
  placeholder: PropTypes.string,
  isCapitalized: PropTypes.bool,
  maxMenuHeight: PropTypes.string,
  isPassingSelectedItem: PropTypes.bool,
};

Select.defaultProps = {
  multiSelect: false,
  isDisabled: false,
  hasError: false,
  onBlur: () => null,
  onMenuScrollToBottom: () => null,
  onValueChange: () => null,
  placeholder: "Selecione...",
  value: "",
  values: [],
  isCapitalized: false,
  maxMenuHeight: "",
  isPassingSelectedItem: false,
};
