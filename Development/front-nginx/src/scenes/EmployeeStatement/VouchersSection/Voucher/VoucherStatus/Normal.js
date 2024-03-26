import React, { Fragment } from "react";
import PropTypes from "prop-types";
import DateManager from "src/modules/DateManager/DateManager";
import { dateHourFormats } from "@enums";
import {
  StyledDate,
  StyledLink,
  StyledLinkNormal,
} from "./VoucherStatus.styles";

const NormalStatus = ({
  newVoucherButtonId,
  blockVoucherButtonId,
  statusDate,
  handleToggleBlockModal,
  handleToggleNewVoucherModal,
  statusNameId,
}) => (
  <Fragment>
    <StyledDate id={statusNameId}>
      {`ativo desde ${DateManager(statusDate).format(
        dateHourFormats.longDateSlash,
      )}`}
    </StyledDate>
    <Fragment>
      <StyledLinkNormal
        id={blockVoucherButtonId}
        onClick={handleToggleBlockModal}
      >
        Bloquear temporariamente
      </StyledLinkNormal>
      <StyledLink id={newVoucherButtonId} onClick={handleToggleNewVoucherModal}>
        Solicitar 2ª via por perda ou roubo
      </StyledLink>
    </Fragment>
  </Fragment>
);

NormalStatus.propTypes = {
  statusDate: PropTypes.string.isRequired,
  newVoucherButtonId: PropTypes.string.isRequired,
  blockVoucherButtonId: PropTypes.string.isRequired,
  handleToggleNewVoucherModal: PropTypes.func.isRequired,
  handleToggleBlockModal: PropTypes.func.isRequired,
  statusNameId: PropTypes.string.isRequired,
};

export default NormalStatus;
