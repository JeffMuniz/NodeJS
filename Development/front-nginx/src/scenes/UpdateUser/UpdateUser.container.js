import React from "react";
// import { Routes, WebPaths } from "src/routes/consts";
import { withRouter } from "react-router-dom";

import UpdateUser from "./UpdateUser";

const UpdateUserContainer = ({ history }) => (
  <UpdateUser
    // goHome={() => history.push(WebPaths[Routes.USERS_REGISTRY_EDIT])}
    history={history}
  />
);

export default withRouter(UpdateUserContainer);
