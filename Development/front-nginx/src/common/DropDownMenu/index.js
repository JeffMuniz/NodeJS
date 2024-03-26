import React, { Component } from "react";
import { string, bool, arrayOf } from "prop-types";

import Menu from "./Menu";

export default class DropDownMenu extends Component {
  state = { isDropDownOpen: false };

  toggleDropDown = () => {
    const { blockDropdownOpen } = this.props;

    if (blockDropdownOpen) return;

    this.setState(({ isDropDownOpen }) => ({
      isDropDownOpen: !isDropDownOpen,
    }));
  };

  render() {
    const { isDropDownOpen } = this.state;
    const { id, valueList } = this.props;

    return (
      <Menu
        toggleDropDown={this.toggleDropDown}
        isDropDownOpen={isDropDownOpen}
        valueList={valueList}
        id={id}
      />
    );
  }
}

DropDownMenu.propTypes = {
  id: string.isRequired,
  valueList: arrayOf(string),
  blockDropdownOpen: bool,
};

DropDownMenu.defaultProps = {
  valueList: ["1", "2", "3"],
  blockDropdownOpen: false,
};
