import React, { Fragment } from "react";
import PropTypes from "prop-types";
import DateManager from "src/modules/DateManager/DateManager";
import { dateHourFormats } from "@enums";
import { StyledDate, NewVoucherMessage } from "./VoucherStatus.styles";

const CancelStatus = ({ newVoucherMessageId, statusDate, statusNameId }) => (
  <Fragment>
    <StyledDate id={statusNameId} changeColor>
      Cartão cancelado
    </StyledDate>

    <NewVoucherMessage id={newVoucherMessageId}>
      {`Novo cartão solicitado em ${DateManager(statusDate).format(
        dateHourFormats.longDateSlash,
      )}`}
    </NewVoucherMessage>
  </Fragment>
);

CancelStatus.propTypes = {
  newVoucherMessageId: PropTypes.string.isRequired,
  statusDate: PropTypes.string.isRequired,
  statusNameId: PropTypes.string.isRequired,
};

export default CancelStatus;
