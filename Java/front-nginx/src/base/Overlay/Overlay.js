import React, { Component } from "react";
import { node, func } from "prop-types";
import { Container } from "./Overlay.styles";

class Overlay extends Component {
  componentDidMount() {
    document.body.style.overflow = "hidden";
  }

  componentWillUnmount() {
    document.body.style.overflow = null;
  }

  render() {
    const { onClick, children } = this.props;

    return (
      <Container id="overlay" onClick={onClick}>
        {children}
      </Container>
    );
  }
}

Overlay.propTypes = {
  children: node.isRequired,
  onClick: func,
};

Overlay.defaultProps = {
  onClick: () => null,
};

export default Overlay;
