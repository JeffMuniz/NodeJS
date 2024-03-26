import React, { Component } from "react";
import { oneOfType, func, number, string } from "prop-types";
import { Link } from "react-router-dom";
import { If } from "@utils";

import { ToastRow, ToastText, ANIMATION_TIME, ToastLink } from "./Toast.styles";

export class Toast extends Component {
  state = {
    active: true,
  };

  componentDidMount() {
    const { time } = this.props;

    setTimeout(() => {
      this.setState({ active: false });
    }, time);
  }

  componentDidUpdate() {
    const { active } = this.state;
    const { remove, id } = this.props;
    if (!active) {
      setTimeout(() => {
        remove(id);
      }, ANIMATION_TIME + 100);
    }
  }

  render() {
    const { id, label, redirectText, redirect, path } = this.props;
    const { active } = this.state;

    return (
      <ToastRow id={id} active={active.toString()}>
        <ToastText>{label}</ToastText>
        <If test={redirectText}>
          <Link
            id="toast-redirect"
            to={{
              pathname: path,
              state: { route: redirect },
            }}
          >
            <ToastLink>{redirectText}</ToastLink>
          </Link>
        </If>
      </ToastRow>
    );
  }
}

Toast.propTypes = {
  remove: func.isRequired,
  id: oneOfType([number, string]).isRequired,
  label: string.isRequired,
  time: number,
  redirectText: string,
  redirect: string,
  path: string,
};

Toast.defaultProps = {
  time: 5000,
  redirectText: "",
  redirect: "",
  path: "",
};

export default Toast;
