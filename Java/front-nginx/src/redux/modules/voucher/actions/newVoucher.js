import { simpleAction } from "@utils";
import * as voucherApi from "src/api/voucher/voucher";
import ResponseError from "src/common/entities/ResponseError";

import {
  ORDER_NEW_VOUCHER_STARTED,
  ORDER_NEW_VOUCHER_COMPLETED,
  ORDER_NEW_VOUCHER_FAILED,
  ORDER_NEW_VOUCHER_RESET,
} from "../reducer/voucher";

const newVoucherLoading = simpleAction(ORDER_NEW_VOUCHER_STARTED)();
const newVoucherCompleted = simpleAction(ORDER_NEW_VOUCHER_COMPLETED)();
const newVoucherFailed = simpleAction(ORDER_NEW_VOUCHER_FAILED);
const newVoucherReset = simpleAction(ORDER_NEW_VOUCHER_RESET)();

export const orderNewVoucher = (
  { id, reasonId } = {},
  injection,
) => async dispatch => {
  const dependencies = { api: voucherApi, ...injection };
  dispatch(newVoucherLoading);

  try {
    const reasons = {
      1: "CANCELADO_PERDA",
      2: "CANCELADO_ROUBO",
    };

    const reason = reasons[reasonId];

    await dependencies.api.updateStatus({ id, reason });

    dispatch(newVoucherCompleted);
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();

    dispatch(newVoucherFailed(errorWithMessage));

    throw errorWithMessage;
  }
};

export const resetNewVoucher = () => dispatch => dispatch(newVoucherReset);
