import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { StyledDatePassword, StyledLinkPassword } from "./VoucherStatus.styles";

const PasswordBlockStatus = ({
  newVoucherButtonId,
  handleToggleNewVoucherModal,
  statusNameId,
}) => (
  <Fragment>
    <StyledDatePassword id={statusNameId}>
      Este cartão foi bloqueado por erro de senha. O funcionário deve cadastrar
      nova senha nos canais digitais.
    </StyledDatePassword>
    <StyledLinkPassword
      id={newVoucherButtonId}
      onClick={handleToggleNewVoucherModal}
    >
      Solicitar 2ª via por perda ou roubo
    </StyledLinkPassword>
  </Fragment>
);

PasswordBlockStatus.propTypes = {
  newVoucherButtonId: PropTypes.string.isRequired,
  handleToggleNewVoucherModal: PropTypes.func.isRequired,
  statusNameId: PropTypes.string.isRequired,
};

export default PasswordBlockStatus;
