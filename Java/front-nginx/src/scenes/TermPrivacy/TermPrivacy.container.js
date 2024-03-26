import React from "react";
import { Routes, WebPaths } from "src/routes/consts";
import { withRouter } from "react-router-dom";

import TermPrivacy from "./TermPrivacy";

const TermPrivacyContainer = ({ history }) => (
  <TermPrivacy
    goHome={() => history.push(WebPaths[Routes.LOGIN])}
    history={history}
  />
);

export default withRouter(TermPrivacyContainer);
