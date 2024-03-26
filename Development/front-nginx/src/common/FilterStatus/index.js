import React from "react";
import PropTypes from "prop-types";
import { Dropdown } from "@common";
import { statusUnifiedInvoice } from "@enums";

const FilterStatus = ({ onChange }) => {
  const handleFilter = selectedOption =>
    onChange({ statusFilter: selectedOption.value });

  return (
    <Dropdown
      id="unified_billing_dropdown_filter"
      callback={handleFilter}
      containerWidth="315px"
      optionsWidth="263px"
      defaultFilter={0}
      options={statusUnifiedInvoice}
    />
  );
};

FilterStatus.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default FilterStatus;
