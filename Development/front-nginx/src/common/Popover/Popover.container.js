import React, { Component } from "react";
import Popover from "./Popover";

export default class PopoverContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopover: false,
    };
  }

  onFocus = () => {
    this.setState({ showPopover: true });
  };

  onBlur = () => {
    this.setState({ showPopover: false });
  };

  onMouseOver = () => {
    this.setState({ showPopover: true });
  };

  onMouseOut = () => {
    this.setState({ showPopover: false });
  };

  render() {
    const { showPopover } = this.state;
    return (
      <Popover
        {...this.props}
        showPopover={showPopover}
        onMouseOut={this.onMouseOut}
        onMouseOver={this.onMouseOver}
        onBlur={this.onBlur}
        onFocus={this.onFocus}
      />
    );
  }
}
