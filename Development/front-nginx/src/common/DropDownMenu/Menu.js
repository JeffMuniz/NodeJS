import React, { Component } from "react";
import { string, arrayOf, func, bool } from "prop-types";
import { IconDots } from "@assets";
import { SvgIcon, ClickOutsideListener } from "@common";
import { toCamelCase } from "@utils";
import {
  SelectWrapper,
  DropDownTrigger,
  DropDownItemsWrapper,
  Item,
} from "./Menu.styles";

class Menu extends Component {
  constructor(props) {
    super(props);

    this.triggerRef = React.createRef();
  }

  renderItems = (value, onSelectValue) => (
    <Item
      key={value}
      onClick={() => onSelectValue(value)}
      id={`dropDown_${toCamelCase(value)}`}
    >
      {value}
    </Item>
  );

  render() {
    const { id, isDropDownOpen, toggleDropDown, valueList } = this.props;
    return (
      <SelectWrapper {...this.props}>
        <div ref={this.triggerRef}>
          <DropDownTrigger id={`${id}-in`} onClick={toggleDropDown}>
            <div>
              <SvgIcon icon={IconDots} />
            </div>
          </DropDownTrigger>
        </div>
        <ClickOutsideListener
          id="drop_down_menu"
          handleClickOutside={toggleDropDown}
          isListening={isDropDownOpen}
          triggerRef={this.triggerRef}
        >
          <DropDownItemsWrapper isOpen={isDropDownOpen}>
            {valueList.map(item => this.renderItems(item.name, item.action))}
          </DropDownItemsWrapper>
        </ClickOutsideListener>
      </SelectWrapper>
    );
  }
}

export default Menu;

Menu.propTypes = {
  id: string.isRequired,
  valueList: arrayOf(string),
  toggleDropDown: func,
  isDropDownOpen: bool,
};

Menu.defaultProps = {
  valueList: [],
  toggleDropDown: () => null,
  isDropDownOpen: false,
};
