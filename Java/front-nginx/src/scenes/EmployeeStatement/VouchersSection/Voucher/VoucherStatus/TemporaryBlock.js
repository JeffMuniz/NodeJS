import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  StyledDate,
  StyledLink,
  StyledLinkNormal,
} from "./VoucherStatus.styles";

const TemporaryBlockStatus = ({
  newVoucherButtonId,
  blockVoucherButtonId,
  dateMessage,
  handleToggleNewVoucherModal,
  changeVoucherStatus,
  statusNameId,
}) => (
  <Fragment>
    <StyledDate id={statusNameId} changeColor>
      {`bloqueado ${dateMessage}`}
    </StyledDate>
    <StyledLinkNormal id={blockVoucherButtonId} onClick={changeVoucherStatus}>
      Desbloquear Cartão
    </StyledLinkNormal>
    <StyledLink id={newVoucherButtonId} onClick={handleToggleNewVoucherModal}>
      Solicitar 2ª via por perda ou roubo
    </StyledLink>
  </Fragment>
);

TemporaryBlockStatus.propTypes = {
  newVoucherButtonId: PropTypes.string.isRequired,
  blockVoucherButtonId: PropTypes.string.isRequired,
  dateMessage: PropTypes.string.isRequired,
  handleToggleNewVoucherModal: PropTypes.func.isRequired,
  changeVoucherStatus: PropTypes.func.isRequired,
  statusNameId: PropTypes.string.isRequired,
};

export default TemporaryBlockStatus;
