import React, { Component } from "react";
import { connect } from "react-redux";
import { oneOfType, shape, number, string } from "prop-types";

import { isEmpty } from "lodash";

import { Container } from "./Toast.styles";
import Toast from "./Toast";

export class ToastContainer extends Component {
  state = {
    queue: [],
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (isEmpty(nextProps.toast)) return null;

    const queue = prevState.queue.slice();
    queue.push({
      id: nextProps.toast.id,
      label: nextProps.toast.label,
      redirectText: nextProps.toast.redirectText,
      redirect: nextProps.toast.redirect,
      path: nextProps.toast.path,
    });

    return { queue };
  }

  remove = id => {
    const { queue } = this.state;
    const newList = queue.filter(toast => toast.id !== id);

    this.setState({ queue: newList });
  };

  render() {
    const { queue } = this.state;

    return (
      <Container>
        {queue.map((toastProps, index) => (
          <Toast key={index} {...toastProps} remove={this.remove} />
        ))}
      </Container>
    );
  }
}

ToastContainer.propTypes = {
  toast: shape({ id: oneOfType([number, string]), label: string }),
};

ToastContainer.defaultProps = {
  toast: {},
};

export const mapStateToProps = ({ toast: { toast } }) => ({
  toast,
});

export default connect(mapStateToProps)(ToastContainer);
