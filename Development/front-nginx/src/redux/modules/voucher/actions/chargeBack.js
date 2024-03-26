import { simpleAction } from "@utils";
import * as voucherApi from "src/api/voucher/voucher";
import ResponseError from "src/common/entities/ResponseError";

import ReasonDto from "src/api/dtos/reason.dto";
import StatusDto from "src/api/dtos/statusChargeBack.dto";

import {
  CHARGEBACK_VOUCHER_STARTED,
  CHARGEBACK_VOUCHER_COMPLETED,
  CHARGEBACK_VOUCHER_FAILED,
  CHARGEBACK_VOUCHER_RESET,
  CHARGEBACK_REASON_STARTED,
  CHARGEBACK_REASON_COMPLETED,
  CHARGEBACK_REASON_FAILED,
  CHARGEBACK_STATUS_STARTED,
  CHARGEBACK_STATUS_COMPLETED,
  CHARGEBACK_STATUS_FAILED,
} from "../reducer/voucher";

const chargeBackStarted = simpleAction(CHARGEBACK_VOUCHER_STARTED)();
const chargeBackCompleted = simpleAction(CHARGEBACK_VOUCHER_COMPLETED)();
const chargeBackFailed = simpleAction(CHARGEBACK_VOUCHER_FAILED);
const chargeBackReset = simpleAction(CHARGEBACK_VOUCHER_RESET)();
const chargeBackReasonStarted = simpleAction(CHARGEBACK_REASON_STARTED)();
const chargeBackReasonCompleted = simpleAction(CHARGEBACK_REASON_COMPLETED);
const chargeBackReasonFailed = simpleAction(CHARGEBACK_REASON_FAILED);
const chargeBackStatusStarted = simpleAction(CHARGEBACK_STATUS_STARTED)();
const chargeBackStatusCompleted = simpleAction(CHARGEBACK_STATUS_COMPLETED);
const chargeBackStatusFailed = simpleAction(CHARGEBACK_STATUS_FAILED);

export const chargeBackVoucher = ({ id, reason }) => async dispatch => {
  dispatch(chargeBackStarted);

  try {
    await voucherApi.chargeBack({ id, reason });

    dispatch(chargeBackCompleted);
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();

    dispatch(chargeBackFailed(errorWithMessage));

    throw errorWithMessage;
  }
};

export const chargeBackVoucherReset = () => dispatch =>
  dispatch(chargeBackReset);

export const chargeBackReason = () => async dispatch => {
  dispatch(chargeBackReasonStarted);

  try {
    const { data } = await voucherApi.chargeBackReason();

    const allStatus = {
      chave: "TODOS",
      descricao: "Todos",
    };

    const allFrist = data.reverse();

    const status = allFrist.concat(allStatus).reverse();

    const result = status.map((el, key) => ReasonDto.fromApi(el, key));

    dispatch(chargeBackReasonCompleted({ payload: result }));
  } catch (error) {
    const errorMessage = new ResponseError(error).getError();

    dispatch(chargeBackReasonFailed(errorMessage));

    throw errorMessage;
  }
};

export const chargeBackStatus = () => async dispatch => {
  dispatch(chargeBackStatusStarted);

  try {
    const allStatus = {
      chave: null,
      descricao: "Todos",
    };

    const { data } = await voucherApi.chargeBackStatus();

    const allFrist = data.reverse();

    const status = allFrist.concat(allStatus).reverse();

    const result = status.map(el => StatusDto.fromApi(el));
    dispatch(chargeBackStatusCompleted(result));
  } catch (error) {
    const errorMessage = new ResponseError(error).getError();

    dispatch(chargeBackStatusFailed(errorMessage));

    throw errorMessage;
  }
};
