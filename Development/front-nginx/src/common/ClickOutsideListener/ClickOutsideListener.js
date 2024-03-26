import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ClickOutsideListener extends Component {
  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClick, false);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClick, false);
  }

  handleClick = event => {
    const { triggerRef, isListening, handleClickOutside } = this.props;
    const trigger = triggerRef.current;
    const wrapper = this.wrapperRef.current;

    if (
      isListening &&
      (!wrapper || !wrapper.contains(event.target)) &&
      (!trigger || !trigger.contains(event.target))
    ) {
      handleClickOutside(event);
    }
  };

  render() {
    const { id, style, children } = this.props;
    return (
      <div ref={this.wrapperRef} id={id} style={style}>
        {children}
      </div>
    );
  }
}

ClickOutsideListener.propTypes = {
  id: PropTypes.string.isRequired,
  triggerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
    .isRequired,
  isListening: PropTypes.bool,
  handleClickOutside: PropTypes.func,
  children: PropTypes.node,
  style: PropTypes.string,
};

/* istanbul ignore next */
ClickOutsideListener.defaultProps = {
  isListening: false,
  handleClickOutside: () => null,
  children: null,
  style: null,
};
