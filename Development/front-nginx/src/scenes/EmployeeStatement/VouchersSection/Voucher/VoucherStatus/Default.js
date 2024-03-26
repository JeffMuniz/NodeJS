import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { StyledDate } from "./VoucherStatus.styles";

const DefaultStatus = ({ statusNameId, statusName }) => (
  <Fragment>
    <StyledDate id={statusNameId} changeColor>
      {statusName}
    </StyledDate>
  </Fragment>
);

DefaultStatus.propTypes = {
  statusNameId: PropTypes.string.isRequired,
  statusName: PropTypes.string.isRequired,
};

export default DefaultStatus;
