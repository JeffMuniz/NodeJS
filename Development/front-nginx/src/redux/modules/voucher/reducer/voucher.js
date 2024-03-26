import { createReducer } from "reduxsauce";
import { requestStatus } from "@enums";

export const ORDER_NEW_VOUCHER_STARTED =
  "project/voucher/ORDER_NEW_VOUCHER_STARTED";
export const ORDER_NEW_VOUCHER_COMPLETED =
  "project/voucher/ORDER_NEW_VOUCHER_COMPLETED";
export const ORDER_NEW_VOUCHER_FAILED =
  "project/voucher/ORDER_NEW_VOUCHER_FAILED";
export const ORDER_NEW_VOUCHER_RESET =
  "project/voucher/ORDER_NEW_VOUCHER_RESET";
export const TEMPORARY_BLOCK_VOUCHER_STARTED =
  "project/voucher/TEMPORARY_BLOCK_VOUCHER_STARTED";
export const TEMPORARY_BLOCK_VOUCHER_COMPLETED =
  "project/voucher/TEMPORARY_BLOCK_VOUCHER_COMPLETED";
export const TEMPORARY_BLOCK_VOUCHER_FAILED =
  "project/voucher/TEMPORARY_BLOCK_VOUCHER_FAILED";
export const TEMPORARY_BLOCK_VOUCHER_RESET =
  "project/voucher/TEMPORARY_BLOCK_VOUCHER_RESET";
export const UNBLOCK_VOUCHER_STARTED =
  "project/voucher/UNBLOCK_VOUCHER_STARTED";
export const UNBLOCK_VOUCHER_COMPLETED =
  "project/voucher/UNBLOCK_VOUCHER_COMPLETED";
export const UNBLOCK_VOUCHER_FAILED = "project/voucher/UNBLOCK_VOUCHER_FAILED";
export const UNBLOCK_VOUCHER_RESET = "project/voucher/UNBLOCK_VOUCHER_RESET";
export const CHARGEBACK_VOUCHER_STARTED =
  "project/voucher/CHARGEBACK_VOUCHER_STARTED";
export const CHARGEBACK_VOUCHER_COMPLETED =
  "project/voucher/CHARGEBACK_VOUCHER_COMPLETED";
export const CHARGEBACK_VOUCHER_FAILED =
  "project/voucher/CHARGEBACK_VOUCHER_FAILED";
export const CHARGEBACK_VOUCHER_RESET =
  "project/voucher/CHARGEBACK_VOUCHER_RESET";

export const CHARGEBACK_REASON_STARTED =
  "project/voucher/CHARGEBACK_REASON_STARTED";
export const CHARGEBACK_REASON_COMPLETED =
  "project/voucher/CHARGEBACK_REASON_COMPLETED";
export const CHARGEBACK_REASON_FAILED =
  "project/voucher/CHARGEBACK_REASONÍ_FAILED";

export const CHARGEBACK_STATUS_STARTED =
  "project/voucher/CHARGEBACK_STATUS_STARTED";
export const CHARGEBACK_STATUS_COMPLETED =
  "project/voucher/CHARGEBACK_STATUS_COMPLETED";
export const CHARGEBACK_STATUS_FAILED =
  "project/voucher/CHARGEBACK_STATUS_FAILED";

const initialState = {
  temporaryBlock: {
    requestStatus: requestStatus.none,
    error: undefined,
  },
  newVoucher: {
    requestStatus: requestStatus.none,
    error: undefined,
  },
  unblock: {
    requestStatus: requestStatus.none,
    error: undefined,
  },
  chargeBack: {
    requestStatus: requestStatus.none,
    error: undefined,
  },
  reason: {
    requestStatus: requestStatus.none,
    error: undefined,
  },
  status: {
    requestStatus: requestStatus.none,
    error: undefined,
  },
};

const setLoading = key => (state = initialState) => ({
  ...state,
  [key]: {
    ...initialState[key],
    requestStatus: requestStatus.loading,
  },
});

const setSuccess = key => (state = initialState) => ({
  ...state,
  [key]: {
    ...initialState[key],
    requestStatus: requestStatus.success,
  },
});

const setFailed = key => (state = initialState, { payload }) => ({
  ...state,
  [key]: {
    requestStatus: requestStatus.error,
    error: payload,
  },
});

const reset = key => (state = initialState) => ({
  ...state,
  [key]: {
    ...initialState[key],
  },
});

const setReasonSuccess = key => (state = initialState, { payload }) => ({
  ...state,
  [key]: {
    ...initialState[key],
    requestStatus: requestStatus.success,
    payload,
  },
});

const handlers = {
  [ORDER_NEW_VOUCHER_STARTED]: setLoading("newVoucher"),
  [ORDER_NEW_VOUCHER_COMPLETED]: setSuccess("newVoucher"),
  [ORDER_NEW_VOUCHER_FAILED]: setFailed("newVoucher"),
  [ORDER_NEW_VOUCHER_RESET]: reset("newVoucher"),
  [TEMPORARY_BLOCK_VOUCHER_STARTED]: setLoading("temporaryBlock"),
  [TEMPORARY_BLOCK_VOUCHER_COMPLETED]: setSuccess("temporaryBlock"),
  [TEMPORARY_BLOCK_VOUCHER_FAILED]: setFailed("temporaryBlock"),
  [TEMPORARY_BLOCK_VOUCHER_RESET]: reset("temporaryBlock"),
  [UNBLOCK_VOUCHER_STARTED]: setLoading("unblock"),
  [UNBLOCK_VOUCHER_COMPLETED]: setSuccess("unblock"),
  [UNBLOCK_VOUCHER_FAILED]: setFailed("unblock"),
  [UNBLOCK_VOUCHER_RESET]: reset("unblock"),
  [CHARGEBACK_VOUCHER_STARTED]: setLoading("chargeBack"),
  [CHARGEBACK_VOUCHER_COMPLETED]: setSuccess("chargeBack"),
  [CHARGEBACK_VOUCHER_FAILED]: setFailed("chargeBack"),
  [CHARGEBACK_VOUCHER_RESET]: reset("chargeBack"),
  [CHARGEBACK_REASON_STARTED]: setLoading("reason"),
  [CHARGEBACK_REASON_COMPLETED]: setReasonSuccess("reason"),
  [CHARGEBACK_REASON_FAILED]: setFailed("reason"),
  [CHARGEBACK_STATUS_STARTED]: setLoading("status"),
  [CHARGEBACK_STATUS_COMPLETED]: setReasonSuccess("status"),
  [CHARGEBACK_STATUS_FAILED]: setFailed("status"),
};

export default createReducer(initialState, handlers);
