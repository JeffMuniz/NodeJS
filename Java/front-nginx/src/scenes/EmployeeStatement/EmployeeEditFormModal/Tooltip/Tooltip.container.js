import React, { PureComponent } from "react";
import { ClickOutsideListener } from "@common";
import Tooltip from "./Tooltip";

class TooltipContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.triggerRef = React.createRef();

    this.state = {
      visible: false,
    };
  }

  setVisibleTrue = () => this.setState({ visible: true });
  setVisibleFalse = () => this.setState({ visible: false });

  render() {
    const { visible } = this.state;
    return (
      <ClickOutsideListener
        id="tooltip"
        triggerRef={this.triggerRef}
        handleClickOutside={this.setVisibleFalse}
        isListening
      >
        <Tooltip
          visible={visible}
          triggerRef={this.triggerRef}
          setVisibleFalse={this.setVisibleTrue}
          {...this.props}
        />
      </ClickOutsideListener>
    );
  }
}

export default TooltipContainer;
