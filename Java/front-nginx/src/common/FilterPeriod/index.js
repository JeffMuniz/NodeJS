import React from "react";
import PropTypes from "prop-types";
import { PeriodDropDown } from "@common";
import DateManager from "src/modules/DateManager/DateManager";
import { FilterPeriodWrapper, FilterLabel } from "./styles";

const dropdownOptionsValues = {
  all: "Todas",
  threeDays: "3 Dias",
  twoDays: "2 Dias",
  oneDay: "1 Dia",
  today: "Hoje",
};

const dateFilterByPeriod = keys => {
  const format = "YYYY-MM-DD";
  const startDate = DateManager().format(format);
  const threeDays = DateManager()
    .add(3, "days")
    .format(format);
  const twoDays = DateManager()
    .add(2, "days")
    .format(format);
  const oneDay = DateManager()
    .add(1, "days")
    .format(format);

  return {
    [keys.all]: { startDate: null, endDate: null },
    [keys.threeDays]: { startDate, endDate: threeDays },
    [keys.twoDays]: { startDate, endDate: twoDays },
    [keys.oneDay]: { startDate, endDate: oneDay },
    [keys.today]: { startDate, endDate: startDate },
  };
};

const parseDate = date =>
  date
    .split("-")
    .reverse()
    .join("-");

const dateFilterByRange = (dateRange = {}) => ({
  startDate: parseDate(dateRange.startDate),
  endDate: parseDate(dateRange.endDate),
});

const FilterPeriod = ({ onChange }) => {
  const handleFilter = (selectedPeriod = {}) => {
    const dateFilters = selectedPeriod.endDate
      ? dateFilterByRange(selectedPeriod)
      : dateFilterByPeriod(dropdownOptionsValues)[selectedPeriod];

    onChange(dateFilters);
  };

  return (
    <FilterPeriodWrapper>
      <FilterLabel>Vencimento: </FilterLabel>
      <PeriodDropDown
        valueList={Object.values(dropdownOptionsValues)}
        onSelectValue={handleFilter}
        maxRange={{ period: "months", value: 1 }}
        canEditPeriod
        editDateText="Escolher data"
        position={false}
      />
    </FilterPeriodWrapper>
  );
};

FilterPeriod.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default FilterPeriod;
