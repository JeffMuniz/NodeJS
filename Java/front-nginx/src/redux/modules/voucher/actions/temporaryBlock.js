import { simpleAction } from "@utils";
import * as voucherApi from "src/api/voucher/voucher";
import ResponseError from "src/common/entities/ResponseError";

import {
  TEMPORARY_BLOCK_VOUCHER_STARTED,
  TEMPORARY_BLOCK_VOUCHER_COMPLETED,
  TEMPORARY_BLOCK_VOUCHER_FAILED,
  TEMPORARY_BLOCK_VOUCHER_RESET,
} from "../reducer/voucher";

const blockVoucherStarted = simpleAction(TEMPORARY_BLOCK_VOUCHER_STARTED)();
const blockVoucherCompleted = simpleAction(TEMPORARY_BLOCK_VOUCHER_COMPLETED)();
const blockVoucherFailed = simpleAction(TEMPORARY_BLOCK_VOUCHER_FAILED);
const blockVoucherReset = simpleAction(TEMPORARY_BLOCK_VOUCHER_RESET)();

export const blockVoucher = (
  { voucherId: id, uptillDate } = {},
  injection,
) => async dispatch => {
  const dependencies = { api: voucherApi, ...injection };
  await dispatch(blockVoucherStarted);

  try {
    const reason = "BLOQUEADO_TEMPORARIO";

    await dependencies.api.updateStatus({ id, reason, uptillDate });

    dispatch(blockVoucherCompleted);
  } catch (error) {
    const errorWithMessage = new ResponseError(error).getError();

    dispatch(blockVoucherFailed(errorWithMessage));

    throw errorWithMessage;
  }
};

export const resetTemporaryBlock = () => dispatch =>
  dispatch(blockVoucherReset);
