import React from "react";
import { bool, string, node, func, shape, instanceOf } from "prop-types";
import { TooltipContainer, StyledTooltip, Message } from "./Tooltip.styles";

const Tooltip = ({ visible, triggerRef, title, children, setVisibleFalse }) => (
  <TooltipContainer>
    <StyledTooltip visible={visible}>
      <Message>{title}</Message>
    </StyledTooltip>
    <div role="presentation" ref={triggerRef} onClick={setVisibleFalse}>
      {children}
    </div>
  </TooltipContainer>
);

Tooltip.propTypes = {
  visible: bool.isRequired,
  title: string.isRequired,
  children: node.isRequired,
  triggerRef: shape({ current: instanceOf(Element) }).isRequired,
  setVisibleFalse: func.isRequired,
};

export default Tooltip;
