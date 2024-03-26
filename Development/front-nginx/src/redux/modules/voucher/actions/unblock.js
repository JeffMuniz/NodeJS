import { simpleAction } from "@utils";
import * as voucherApi from "src/api/voucher/voucher";
import ResponseError from "src/common/entities/ResponseError";

import {
  UNBLOCK_VOUCHER_STARTED,
  UNBLOCK_VOUCHER_COMPLETED,
  UNBLOCK_VOUCHER_FAILED,
  UNBLOCK_VOUCHER_RESET,
} from "../reducer/voucher";

const unblockStarted = simpleAction(UNBLOCK_VOUCHER_STARTED)();
const unblockCompleted = simpleAction(UNBLOCK_VOUCHER_COMPLETED)();
const unblockFailed = simpleAction(UNBLOCK_VOUCHER_FAILED);
const unblockReset = simpleAction(UNBLOCK_VOUCHER_RESET)();

export const unblockVoucher = ({ id } = {}, injection) => async dispatch => {
  const dependencies = { api: voucherApi, ...injection };
  dispatch(unblockStarted);

  try {
    const reason = "NORMAL";

    await dependencies.api.updateStatus({ id, reason });

    dispatch(unblockCompleted);
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();

    dispatch(unblockFailed(errorWithMessage));

    throw errorWithMessage;
  }
};

export const unblockVoucherReset = () => dispatch => dispatch(unblockReset);
