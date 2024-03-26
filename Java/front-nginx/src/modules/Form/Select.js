import React from "react";
import { shape } from "prop-types";
import { StyledSelect } from "./Select.styled";

import CustomField, { CustomFieldPropsTypes } from "./CustomField";

const Select = ({ name, label, placeholder, options, width, ...rest }) => (
  <CustomField
    name={name}
    label={label}
    placeholder={placeholder}
    width={width}
    {...rest}
    render={({ field, form: { setFieldValue, setFieldTouched } }) => (
      <StyledSelect
        {...field}
        options={options}
        clearable={false}
        searchable={false}
        placeholder={placeholder || "Escolha..."}
        onBlur={() => setFieldTouched(field.name)}
        onChange={option => setFieldValue(field.name, option.value)}
        noResultsText=""
      />
    )}
  />
);

Select.propTypes = {
  ...CustomFieldPropsTypes,
  options: shape({}).isRequired,
};

export default Select;
