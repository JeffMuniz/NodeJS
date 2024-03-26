import React, { Fragment } from "react";
import { string, number, func } from "prop-types";
import DateManager from "src/modules/DateManager/DateManager";

import { dateHourFormats } from "@enums";
import BlockStatus from "./VoucherStatus/Block";
import PasswordBlockStatus from "./VoucherStatus/PasswordBlock";
import TemporaryBlockStatus from "./VoucherStatus/TemporaryBlock";
import CancelStatus from "./VoucherStatus/Cancel";
import NormalStatus from "./VoucherStatus/Normal";
import DefaultStatus from "./VoucherStatus/Default";

import {
  Container,
  StyledNumber,
  Canceled,
  VoucherImage,
  VoucherBody,
} from "./Voucher.styles";

const VOUCHER_TYPE = {
  1: "food",
  2: "meal",
};

const VOUCHER_STATUS = {
  normal: NormalStatus,
  bloqueado: BlockStatus,
  "bloqueado senha incorreta": PasswordBlockStatus,
  "bloqueado prevenção": TemporaryBlockStatus,
  "cancelado perda": CancelStatus,
  "cancelado roubo": CancelStatus,
};

export const Voucher = ({
  id,
  idProduct,
  statusDate,
  cardNumber,
  statusName,
  index,
  changeVoucherStatus,
  getIcon,
  handleToggleBlockModal,
  handleToggleNewVoucherModal,
}) => {
  const statusNameLower = statusName.toLowerCase();
  const StatusCard = VOUCHER_STATUS[statusNameLower] || DefaultStatus;

  return (
    <Fragment>
      <Container id={`${VOUCHER_TYPE[idProduct]}-card-${index}`}>
        <Canceled canceled={statusNameLower.includes("cancela")} />
        <VoucherImage>
          <img alt={VOUCHER_TYPE[idProduct]} src={getIcon(idProduct)} />
        </VoucherImage>
        <VoucherBody>
          <StyledNumber id={`employee_statement_voucher_card_number_${index}`}>
            {cardNumber.replace(/\*+/g, " xxxx xxxx ")}
          </StyledNumber>
          <StatusCard
            blockVoucherButtonId={`${VOUCHER_TYPE[idProduct]}-link-block-${index}`}
            newVoucherMessageId={`${VOUCHER_TYPE[idProduct]}-new-voucher-message-${index}`}
            newVoucherButtonId={`${VOUCHER_TYPE[idProduct]}-link-new-voucher-${index}`}
            statusNameId={`${VOUCHER_TYPE[idProduct]}-status-${index}`}
            changeVoucherStatus={() => changeVoucherStatus(id)}
            dateMessage={`desde ${DateManager(statusDate).format(
              dateHourFormats.longDateSlash,
            )}`}
            handleToggleBlockModal={handleToggleBlockModal}
            handleToggleNewVoucherModal={handleToggleNewVoucherModal}
            statusDate={statusDate}
            statusName={statusName}
          />
        </VoucherBody>
      </Container>
    </Fragment>
  );
};

Voucher.propTypes = {
  id: string.isRequired,
  idProduct: string.isRequired,
  cardNumber: string.isRequired,
  statusDate: string.isRequired,
  index: number.isRequired,
  statusName: string.isRequired,
  changeVoucherStatus: func.isRequired,
  handleToggleBlockModal: func.isRequired,
  handleToggleNewVoucherModal: func.isRequired,
  getIcon: func,
};

Voucher.defaultProps = {
  getIcon: () => null,
};

export default Voucher;
