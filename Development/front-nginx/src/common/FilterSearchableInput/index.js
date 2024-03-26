import React, { Component } from "react";
import PropTypes from "prop-types";
import debounce from "lodash/debounce";
import { SearchableInput } from "@base";

import { Container } from "./styles";

const DEBOUNCE_DELAY_TIME = 0;

const filterTypeOptions = [
  {
    key: "orderId",
    description: "ID pedido",
    queryParam: "idPedido",
  },
  {
    key: "cnpj",
    description: "CNPJ",
    mask: "cnpj",
    queryParam: "cnpjPagador",
  },
];

class FilterSearchableInput extends Component {
  state = {
    filterBy: this.props.dropdownFilterOptions[0],
    typedValue: "",
  };

  onTyping = this.onTyping.bind(this);

  onTyping(typedValue) {
    const { onInputWithoutDebounce } = this.props;

    onInputWithoutDebounce(typedValue);

    const debouncedInput = debounce(
      () => this.handleFilter(typedValue),
      DEBOUNCE_DELAY_TIME,
    );

    debouncedInput();
  }

  changeFilterType = this.changeFilterType.bind(this);

  changeFilterType(filterBy) {
    const { onInput } = this.props;
    const { typedValue, filterBy: filterByState } = this.state;

    const callback = typedValue
      ? () => onInput({ typedValue: "", ...filterByState })
      : null;

    this.setState({ typedValue: "", filterBy }, callback);
  }

  handleFilter(typedValue) {
    const { onInput } = this.props;
    const { filterBy } = this.state;

    this.setState({ typedValue }, onInput({ typedValue, ...filterBy }));
  }

  render() {
    const { filterBy } = this.state;
    const {
      dropdownFilterOptions,
      marginRight,
      onInputWithoutDebounce,
    } = this.props;

    return (
      <Container>
        <SearchableInput
          id="searchable_input_id"
          fieldsToFilterBy={dropdownFilterOptions}
          onInput={onInputWithoutDebounce}
          onChange={this.onTyping}
          onFilterChange={this.changeFilterType}
          filterBy={filterBy}
          marginRight={marginRight}
          position="absolute"
        />
      </Container>
    );
  }
}

FilterSearchableInput.propTypes = {
  onInput: PropTypes.func.isRequired,
  dropdownFilterOptions: PropTypes.arrayOf(PropTypes.object),
  marginRight: PropTypes.string,
  onInputWithoutDebounce: PropTypes.func,
};

FilterSearchableInput.defaultProps = {
  dropdownFilterOptions: filterTypeOptions,
  marginRight: "",
  onInputWithoutDebounce: () => null,
};

export default FilterSearchableInput;
