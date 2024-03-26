import React, { Component } from "react";
import { arrayOf, shape, string, func, oneOfType, number } from "prop-types";
import { toOnlyNumbers } from "@utils";
import { isEqual } from "lodash";
import Dropdown from "./Dropdown";

class SearchableDropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chosenOption: null,
      availableOptions: props.options,
    };
  }
  componentDidUpdate(prevProps) {
    const { options } = this.props;
    if (!isEqual(options, prevProps.options)) {
      this.updateAvailableOptions(options);
    }
  }

  updateAvailableOptions = availableOptions =>
    this.setState({ availableOptions });

  handleOnSelect = chosenOption => () =>
    this.setState({ chosenOption }, () => {
      const { onSelect } = this.props;

      // eslint-disable-next-line react/destructuring-assignment
      onSelect(this.state.chosenOption);
    });

  handleInputChange = inputValue => {
    const { onFilterOptions, options, searchBy, maskType } = this.props;

    const value = maskType === "text" ? inputValue : toOnlyNumbers(inputValue);

    if (!inputValue) return this.setState({ availableOptions: options });
    if (onFilterOptions) return onFilterOptions(value);

    const availableOptions = options.filter(
      op => op[searchBy].toLowerCase().indexOf(value.toLowerCase()) >= 0,
    );

    this.setState({ availableOptions });
  };

  handleInfiniteScroll = ({
    target: { scrollHeight, scrollTop, clientHeight },
  }) => {
    const { onScrollBottom } = this.props;

    if (scrollHeight - scrollTop === clientHeight) {
      onScrollBottom();
    }
  };

  render() {
    const { id, inputPlaceHolder, maskType } = this.props;
    const { availableOptions } = this.state;

    return (
      <Dropdown
        id={id}
        onScroll={this.handleInfiniteScroll}
        options={availableOptions}
        onSelect={this.handleOnSelect}
        inputPlaceHolder={inputPlaceHolder}
        onFilterOptions={this.handleInputChange}
        maskType={maskType}
      />
    );
  }
}

SearchableDropdown.propTypes = {
  id: string,
  options: arrayOf(
    shape({
      value: oneOfType([string, number]),
      description: string,
    }),
  ).isRequired,
  onSelect: func.isRequired,
  inputPlaceHolder: string,
  onFilterOptions: func,
  onScrollBottom: func,
  maskType: string,
  searchBy: string.isRequired,
};

SearchableDropdown.defaultProps = {
  id: "searchable_dropdown",
  inputPlaceHolder: "",
  onFilterOptions: undefined,
  maskType: "text",
  onScrollBottom: () => null,
};

export default SearchableDropdown;
