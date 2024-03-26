import { bool, string } from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";

import LogHistory from "./LogHistory";

const LogHistoryContainer = ({ history, user, userStatus }) => (
  <LogHistory history={history} user={user} userStatus={userStatus} />
);

LogHistoryContainer.propTypes = {
  user: string.isRequired,
  userStatus: bool.isRequired,
};

export default withRouter(LogHistoryContainer);
