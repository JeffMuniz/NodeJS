import React, { Component } from "react";
import { shape, string, bool } from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Routes, WebPaths } from "src/routes/consts";

import PageNotFound from "./PageNotFound";

export class PageNotFoundContainer extends Component {
  componentDidMount() {
    const {
      history: {
        location: { pathname },
        push,
      },
      user: { isAuthenticated },
    } = this.props;

    if (!isAuthenticated) {
      push(WebPaths[Routes.LOGIN]);
    }

    if (pathname === WebPaths[Routes.DEFAULT]) {
      push(WebPaths[Routes.ORDERS_DASHBOARD]);
    }
  }

  handleReturn = () => {
    const { history } = this.props;

    history.goBack();
  };

  render() {
    return <PageNotFound handleReturn={this.handleReturn} />;
  }
}

export function mapStateToProps({ user: { profile: user } }) {
  return {
    user,
  };
}

PageNotFoundContainer.propTypes = {
  history: shape({
    pathname: string,
  }).isRequired,
  location: shape({
    pathname: string,
  }).isRequired,
  user: shape({
    isAuthenticated: bool,
  }).isRequired,
};

export default withRouter(connect(mapStateToProps)(PageNotFoundContainer));
