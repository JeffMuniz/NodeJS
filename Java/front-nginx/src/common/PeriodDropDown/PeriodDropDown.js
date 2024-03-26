import React, { Component } from "react";
import PropTypes from "prop-types";

import { If } from "@utils";
import { ArrowIcon, PeriodDatePicker, ClickOutsideListener } from "@common";

import {
  SelectWrapper,
  DropDownTrigger,
  DropDownItemsWrapper,
  Item,
  StyledItem,
  StyledIcon,
} from "./PeriodDropDown.styles";

class PeriodDropDown extends Component {
  constructor(props) {
    super(props);

    this.triggerRef = React.createRef();
  }

  renderItems = (values, onSelectValue) =>
    values.map(value => (
      <Item
        key={value}
        onClick={() => onSelectValue(value)}
        id={`pdd_${value}`}
      >
        {value}
      </Item>
    ));

  render() {
    const {
      id,
      isDropDownOpen,
      onSelectValue,
      toggleDropDown,
      selectedValue,
      valueList,
      canEditPeriod,
      onClickPeriod,
      onSetCustomPeriod,
      onCloseDatePicker,
      datepickerOpen,
      datePickerMinDate,
      datePickerMaxDate,
      selectedStartDate,
      selectedEndDate,
      maxRange,
      calendarInfo,
      padding,
      editDateText,
    } = this.props;

    return (
      <SelectWrapper {...this.props}>
        <div ref={this.triggerRef}>
          <DropDownTrigger id={id} onClick={toggleDropDown}>
            <div>{selectedValue}</div>
            <StyledIcon>
              <ArrowIcon isUp={isDropDownOpen} />
            </StyledIcon>
          </DropDownTrigger>
        </div>
        <ClickOutsideListener
          id={`period_dropdown_${id}`}
          handleClickOutside={toggleDropDown}
          isListening={isDropDownOpen}
          triggerRef={this.triggerRef}
        >
          <DropDownItemsWrapper isOpen={isDropDownOpen} padding={padding}>
            {this.renderItems(valueList, onSelectValue)}
            <If test={canEditPeriod}>
              <StyledItem
                key="periodSelector"
                onClick={onClickPeriod}
                id="pdd_period_selector"
              >
                {editDateText || "Editar período"}
              </StyledItem>
            </If>
          </DropDownItemsWrapper>
        </ClickOutsideListener>
        <If test={datepickerOpen}>
          <PeriodDatePicker
            id="pdd_date"
            onDatesChange={onSetCustomPeriod}
            onCloseDatePicker={onCloseDatePicker}
            minDate={datePickerMinDate}
            maxDate={datePickerMaxDate}
            initialStartDate={selectedStartDate}
            initialEndDate={selectedEndDate}
            maxRange={maxRange}
            calendarInfo={calendarInfo}
          />
        </If>
      </SelectWrapper>
    );
  }
}

export default PeriodDropDown;

PeriodDropDown.propTypes = {
  id: PropTypes.string.isRequired,
  valueList: PropTypes.arrayOf(PropTypes.string),
  onSelectValue: PropTypes.func,
  toggleDropDown: PropTypes.func,
  isDropDownOpen: PropTypes.bool,
  selectedValue: PropTypes.string,
  selectedStartDate: PropTypes.string,
  selectedEndDate: PropTypes.string,
  canEditPeriod: PropTypes.bool,
  datepickerOpen: PropTypes.bool,
  datePickerMinDate: PropTypes.string,
  datePickerMaxDate: PropTypes.string,
  onClickPeriod: PropTypes.func,
  onSetCustomPeriod: PropTypes.func,
  onCloseDatePicker: PropTypes.func,
  maxRange: PropTypes.shape({
    period: PropTypes.string,
    value: PropTypes.number,
  }),
  calendarInfo: PropTypes.func,
  padding: PropTypes.string,
  position: PropTypes.bool,
  editDateText: PropTypes.string,
};
/* istanbul ignore next */
PeriodDropDown.defaultProps = {
  valueList: [],
  onSelectValue: () => null,
  toggleDropDown: () => null,
  isDropDownOpen: false,
  selectedValue: "",
  selectedStartDate: "",
  selectedEndDate: "",
  canEditPeriod: false,
  datepickerOpen: false,
  datePickerMinDate: "",
  datePickerMaxDate: "",
  onClickPeriod: () => null,
  onSetCustomPeriod: () => null,
  onCloseDatePicker: () => null,
  maxRange: {},
  calendarInfo: () => null,
  padding: "",
  position: true,
  editDateText: "Editar período",
};
