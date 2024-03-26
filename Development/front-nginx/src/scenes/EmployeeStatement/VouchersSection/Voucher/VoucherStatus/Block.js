import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { StyledDate, StyledLinkBlock } from "./VoucherStatus.styles";

const BlockStatus = ({
  newVoucherButtonId,
  handleToggleNewVoucherModal,
  statusNameId,
}) => (
  <Fragment>
    <StyledDate id={statusNameId}>Ativação pendente</StyledDate>
    <StyledLinkBlock
      id={newVoucherButtonId}
      onClick={handleToggleNewVoucherModal}
    >
      Solicitar 2ª via por perda ou roubo
    </StyledLinkBlock>
  </Fragment>
);

BlockStatus.propTypes = {
  newVoucherButtonId: PropTypes.string.isRequired,
  handleToggleNewVoucherModal: PropTypes.func.isRequired,
  statusNameId: PropTypes.string.isRequired,
};

export default BlockStatus;
