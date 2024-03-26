import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logged, notLogged } from "@enums";
import isEmpty from "lodash/isEmpty";
import { node, string, bool } from "prop-types";
import Template from "./Template";

export const getTheme = (isAuthenticated, accessToken) => {
  const themeStyle =
    isAuthenticated && !isEmpty(accessToken) ? logged : notLogged;
  return {
    main: themeStyle,
    flexboxgrid: {
      gutterWidth: 1.5,
      outerMargin: 1.5,
    },
  };
};

export const TemplateContainer = ({
  isAuthenticated,
  accessToken,
  history,
  showModal,
  ...rest
}) => (
  <Template
    {...rest}
    theme={getTheme(isAuthenticated, accessToken)}
    isAuthenticated={isAuthenticated && !isEmpty(accessToken)}
    history={history}
    showModal={showModal}
  />
);

export const mapStateToProps = ({
  user: { isAuthenticated },
  session,
  modal: { showModal },
}) => ({
  isAuthenticated,
  accessToken: session.accessToken,
  showModal,
});

export default withRouter(connect(mapStateToProps)(TemplateContainer));

TemplateContainer.propTypes = {
  isAuthenticated: bool,
  accessToken: string,
  children: node.isRequired,
  showModal: bool,
  shouldRenderWithoutGroupId: bool,
};

TemplateContainer.defaultProps = {
  isAuthenticated: false,
  accessToken: "",
  showModal: false,
  shouldRenderWithoutGroupId: false,
};
