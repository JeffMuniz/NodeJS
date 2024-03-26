import React from "react";
import PropTypes, { string } from "prop-types";
import { isEmpty, isInteger, isBoolean, some } from "lodash";
import "react-select/dist/react-select.css";

import { Select } from "./MultiSelect.styles";

const getValue = value => {
  const isEmptyObj = some(value, field => {
    if (isInteger(field) || isBoolean(field)) return false;
    return isEmpty(field);
  });
  return isEmptyObj ? "" : value;
};

const MultiSelect = props => {
  const {
    items,
    multiSelect,
    selectedItem,
    getMoreData,
    isCapitalized,
    maxMenuHeight,
  } = props;
  if (multiSelect && !items.some(item => item.id === 0)) {
    items.push({ id: 0, name: "Todos" });
  }

  return (
    <Select
      options={items.sort((a, b) => a.id > b.id)}
      multi={multiSelect}
      value={getValue(selectedItem)}
      valueKey="id"
      labelKey="name"
      onMenuScrollToBottom={getMoreData}
      clearable={false}
      isCapitalized={isCapitalized}
      maxMenuHeight={maxMenuHeight}
      {...props}
    />
  );
};

export default MultiSelect;

MultiSelect.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  getMoreData: PropTypes.func,
  multiSelect: PropTypes.bool,
  hasError: PropTypes.bool,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
    }),
  ),
  placeholder: PropTypes.string,
  selectedItem: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.number,
    }),
  ]),
  isCapitalized: PropTypes.bool,
  maxMenuHeight: string,
};

MultiSelect.defaultProps = {
  multiSelect: false,
  hasError: false,
  onChange: () => null,
  onBlur: () => null,
  getMoreData: () => null,
  placeholder: "Selecione...",
  items: [],
  selectedItem: null,
  isCapitalized: false,
  maxMenuHeight: "",
};
