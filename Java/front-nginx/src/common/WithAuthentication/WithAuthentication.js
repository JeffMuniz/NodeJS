import React from "react";
import { Route, Redirect } from "react-router-dom";
import { func, string, bool, shape } from "prop-types";
import { Template } from "@common";

import store from "src/redux/configureStore";

import { Routes, WebPaths } from "src/routes/consts";
import { WithTracker } from "src/modules/Tracking";

const PrivateRoute = ({ component: Component, exact, path, computedMatch }) => {
  const {
    user: { isAuthenticated },
  } = store.getState();

  if (!isAuthenticated) {
    // For now we will only redirect the user if the requested url is
    // financeiro/*, otherwise the user will be redirected to pedidos
    // after a successful login
    const state = computedMatch.url.includes(WebPaths[Routes.FINANCES])
      ? { from: computedMatch.url }
      : null;

    return (
      <Redirect
        to={{
          pathname: WebPaths[Routes.LOGIN],
          state,
        }}
      />
    );
  }

  return (
    <Route exact={exact} path={path}>
      <WithTracker>
        <Template>
          <Component />
        </Template>
      </WithTracker>
    </Route>
  );
};

PrivateRoute.propTypes = {
  component: func.isRequired,
  exact: bool.isRequired,
  path: string.isRequired,
  computedMatch: shape({}),
};

PrivateRoute.defaultProps = {
  computedMatch: {},
};

export default PrivateRoute;
