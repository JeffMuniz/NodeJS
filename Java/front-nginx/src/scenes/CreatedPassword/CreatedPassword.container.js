import React from "react";
import { Routes, WebPaths } from "src/routes/consts";
import { withRouter } from "react-router-dom";

import CreatedPassword from "./CreatedPassword";

const CreatedPasswordContainer = ({ history: { push } }) => (
  <CreatedPassword goHome={() => push(WebPaths[Routes.LOGIN])} />
);

export default withRouter(CreatedPasswordContainer);
