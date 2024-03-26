import { createReducer } from "reduxsauce";
import { requestStatus } from "@enums";

export const REQUEST_HEADER_CHARGEBACK_DETAILS =
  "project/chargeback/REQUEST_HEADER_CHARGEBACK_DETAILS";
export const REQUEST_DETAILS_CHARGEBACK_DETAILS =
  "project/chargeback/REQUEST_DETAILS_CHARGEBACK_DETAILS";

export const CHARGEBACK_REQUEST_STARTED =
  "project/voucher/CHARGEBACK_REQUEST_STARTED";
export const CHARGEBACK_REQUEST_COMPLETED =
  "project/voucher/CHARGEBACK_REQUEST_COMPLETED";
export const CHARGEBACK_REQUEST_FAILED =
  "project/voucher/CHARGEBACK_REQUEST_FAILED";
export const CHARGEBACK_EMPLOYEE_STARTED =
  "project/voucher/CHARGEBACK_EMPLOYEE_STARTED";
export const CHARGEBACK_EMPLOYEE_COMPLETED =
  "project/voucher/CHARGEBACK_EMPLOYEE_COMPLETED";
export const CHARGEBACK_EMPLOYEE_FAILED =
  "project/voucher/CHARGEBACK_EMPLOYEE_FAILED";

const initialState = {
  chargebackHeader: {},
  chargebackDetails: {},
  chargebackRequest: {
    requestStatus: requestStatus.none,
    error: undefined,
  },
  chargebackEmployee: {
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

const setSuccess = key => (state = initialState, { payload }) => ({
  ...state,
  [key]: {
    requestStatus: requestStatus.success,
    payload,
  },
});

const setFailed = key => (state = initialState, { payload }) => ({
  ...state,
  [key]: {
    requestStatus: requestStatus.error,
    payload,
  },
});

const requestHeaderChargeback = (state = initialState, { payload }) => ({
  ...state,
  chargebackHeader: payload,
});

const requestDetailsChargeBack = (state = initialState, { payload }) => ({
  ...state,
  chargebackDetails: payload,
});

const handlers = {
  [REQUEST_HEADER_CHARGEBACK_DETAILS]: requestHeaderChargeback,
  [REQUEST_DETAILS_CHARGEBACK_DETAILS]: requestDetailsChargeBack,
  [CHARGEBACK_REQUEST_STARTED]: setLoading("chargebackRequest"),
  [CHARGEBACK_REQUEST_COMPLETED]: setSuccess("chargebackRequest"),
  [CHARGEBACK_REQUEST_FAILED]: setFailed("chargebackRequest"),
  [CHARGEBACK_EMPLOYEE_STARTED]: setLoading("chargebackEmployee"),
  [CHARGEBACK_EMPLOYEE_COMPLETED]: setSuccess("chargebackEmployee"),
  [CHARGEBACK_EMPLOYEE_FAILED]: setFailed("chargebackEmployee"),
};

export default createReducer(initialState, handlers);
